'use client';

import { useState, useEffect, ChangeEvent, useCallback, useRef } from 'react';
import {
  Table,
  Loader2,
  Save,
  X,
  RefreshCw,
  Search,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronsUpDown,
} from 'lucide-react';
import { DatabaseViewerProps } from '@/models/model';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface Row {
  id: number;
  [key: string]: any;
}

interface TableInfo {
  db: string;
  table: string;
  key: string;
  label: string;
}

export function DatabaseViewer({
  darkMode,
  cardClass,
  inputClass,
}: DatabaseViewerProps) {
  const [selectedTableKey, setSelectedTableKey] = useState<string>('');
  const [tableData, setTableData] = useState<Row[]>([]);
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; field: string } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load tables
  const loadTableSchemaDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rawData = await api.retrieveTableSchema();
      if (!rawData || rawData.length === 0) {
        setTables([]);
        return;
      }

      const formatted: TableInfo[] = rawData.map(([db, table]: [string, string]) => ({
        db,
        table,
        key: `${db}-${table}`,
        label: `${db} → ${table}`,
      }));

      setTables(formatted);

      if (formatted.length > 0 && !selectedTableKey) {
        setSelectedTableKey(formatted[0].key);
      }
    } catch (err: any) {
      setError('Failed to load table list');
      toast.error('Could not load tables');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load rows
  const loadTableRows = useCallback(async () => {
    if (!selectedTableKey) {
      setTableData([]);
      return;
    }

    setLoading(true);
    setError(null);
    const [db, table] = selectedTableKey.split('-');

    try {
      const data = await api.retrieveTableRows(db, table);
      setTableData(data ?? []);
    } catch (err: any) {
      setError('Failed to load table data');
      toast.error('Failed to load rows');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedTableKey]);

  // Delete row
  const deleteTableRow = async (table_id: number) => {
    const [db, table] = selectedTableKey.split('-');
    try {
      const res = await api.deleteTableRow(db, table, table_id);
      toast.success(res || 'Row deleted');
      setTableData(prev => prev.filter(r => r.id !== table_id));
      setSelectedIndex(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  // Update single field
  const updateTableRow = async (table_id: number, field: string, value: any) => {
    const [db, table] = selectedTableKey.split('-');
    try {
      const res = await api.updateTableRow(db, table, table_id, { [field]: value });
      toast.success(res || 'Updated successfully');
      return true;
    } catch (err: any) {
      toast.error(err.message || 'Update failed');
      return false;
    }
  };

  // Initial load
  useEffect(() => {
    loadTableSchemaDetails();
  }, [loadTableSchemaDetails]);

  useEffect(() => {
    loadTableRows();
  }, [loadTableRows]);

  const handleTableChange = (key: string) => {
    setSelectedTableKey(key);
    setSearchQuery('');
    setSelectedIndex(null);
    setDropdownOpen(false);
  };

  const handleRowClick = (index: number) => {
    if (editingCell) return;
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const handleCellEdit = (rowIndex: number, field: string, currentValue: unknown) => {
    if (field === 'id') return;
    setEditingCell({ rowIndex, field });
    setEditValue(String(currentValue ?? ''));
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleSaveEdit = async () => {
    if (!editingCell) return;

    const { rowIndex, field } = editingCell;
    const newValue = editValue.trim() === '' ? null : editValue;
    const row = tableData[rowIndex];
    const originalValue = row[field];

    // Optimistically update UI
    setTableData(prev =>
      prev.map((r, i) => (i === rowIndex ? { ...r, [field]: newValue } : r))
    );

    // Save to backend
    const success = await updateTableRow(row.id, field, newValue);

    // Revert on failure
    if (!success) {
      setTableData(prev =>
        prev.map((r, i) => (i === rowIndex ? { ...r, [field]: originalValue } : r))
      );
    }

    setEditingCell(null);
    setEditValue('');
  };

  const handleDeleteClick = () => {
    if (selectedIndex === null) {
      toast.error('Please select a row');
      return;
    }
    if (!confirm('Delete this row permanently?')) return;

    const rowId = tableData[selectedIndex].id;
    deleteTableRow(rowId);
  };

  const filteredData = tableData.filter(row =>
    Object.values(row).some(val =>
      String(val ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentTable = tables.find(t => t.key === selectedTableKey);
  const currentLabel = currentTable?.label || 'No table selected';

  const filteredTables = tables.filter(t =>
    t.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && tables.length === 0) {
    return (
      <div className={`${cardClass} border rounded-xl p-12 flex flex-col items-center justify-center gap-4`}>
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="text-sm opacity-60">Loading tables...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className={`${cardClass} border rounded-xl p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <Table className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Database Viewer</h3>
              <p className="text-xs opacity-60 mt-1">Browse and edit table records</p>
            </div>
          </div>

          <button
            onClick={loadTableSchemaDetails}
            className={`p-3 rounded-xl transition-all shadow-md ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } ${loading ? 'opacity-50' : 'hover:scale-105'}`}
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin text-blue-600' : ''} />
          </button>
        </div>

        {/* Beautiful Custom Dropdown */}
        <div className="max-w-md">
          <label className="text-xs font-medium opacity-70 mb-2 block">Select Table</label>
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-full px-4 py-3 rounded-xl border ${inputClass} text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3`}
              disabled={loading || tables.length === 0}
            >
              <span className="truncate">{currentLabel}</span>
              <ChevronsUpDown size={16} className="shrink-0 opacity-60" />
            </button>

            {dropdownOpen && (
              <div className={`absolute top-full mt-2 w-full rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-xl z-50 overflow-hidden`}>
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" />
                    <input
                      type="text"
                      placeholder="Search tables..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${inputClass} border`}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {filteredTables.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm opacity-60">
                      No tables found
                    </div>
                  ) : (
                    filteredTables.map(t => (
                      <button
                        key={t.key}
                        onClick={() => handleTableChange(t.key)}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-blue-600 hover:text-white transition-all ${
                          selectedTableKey === t.key ? 'bg-blue-600 text-white' : ''
                        }`}
                      >
                        {t.label}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-red-500 shrink-0" size={18} />
            <div className="text-red-500 text-sm font-medium">{error}</div>
          </div>
        )}
      </div>

      {/* Data Table */}
      {selectedTableKey && (
        <div className={`${cardClass} border rounded-xl shadow-lg overflow-hidden`}>
          <div className={`p-5 border-b ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'bg-gray-50'} flex flex-wrap items-center justify-between gap-4`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Table className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">{currentLabel}</h4>
                <p className="text-xs opacity-60">
                  {filteredData.length} record{filteredData.length !== 1 ? 's' : ''}
                  {searchQuery && ' (filtered)'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" />
                <input
                  type="text"
                  placeholder="Search rows..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2.5 rounded-xl border ${inputClass} w-56 text-sm shadow-sm focus:shadow-md transition-shadow`}
                />
              </div>

              <button
                onClick={handleDeleteClick}
                disabled={selectedIndex === null || loading}
                className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
              >
                <Trash2 size={14} />
                Delete Row
              </button>
            </div>
          </div>

          {/* Table Body */}
          {filteredData.length === 0 ? (
            <div className="text-center py-20">
              <div className={`p-5 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl w-fit mx-auto mb-4`}>
                <Table size={40} className="opacity-30" />
              </div>
              <p className="text-base font-medium opacity-70">
                {searchQuery ? 'No matching records' : 'No data in this table'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                    <th className="text-center py-4 px-4 font-bold text-xs uppercase opacity-70 w-16">#</th>
                    {Object.keys(filteredData[0]).map(key => (
                      <th key={key} className="text-left py-4 px-4 font-bold text-xs uppercase opacity-70">
                        {key}
                      </th>
                    ))}
                    <th className="text-center py-4 px-4 font-bold text-xs uppercase opacity-70 w-32">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, i) => {
                    const isSelected = selectedIndex === i;

                    return (
                      <tr
                        key={row.id ?? i}
                        onClick={() => handleRowClick(i)}
                        className={`border-b cursor-pointer transition-all ${
                          darkMode ? 'border-gray-800' : 'border-gray-100'
                        } ${isSelected
                          ? darkMode
                            ? 'bg-blue-900/40 border-l-4 border-blue-500'
                            : 'bg-blue-50 border-l-4 border-blue-500'
                          : darkMode
                            ? 'hover:bg-gray-800/50'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="py-3 px-4 text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mx-auto transition-all ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-lg scale-110'
                                : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                            }`}
                          >
                            {i + 1}
                          </div>
                        </td>

                        {Object.entries(row).map(([key, val]) => {
                          const isEditing = editingCell?.rowIndex === i && editingCell?.field === key;
                          const isId = key === 'id';

                          return (
                            <td key={key} className="py-3 px-4" onClick={e => e.stopPropagation()}>
                              {isEditing ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={editValue}
                                    onChange={e => setEditValue(e.target.value)}
                                    onKeyDown={e => {
                                      if (e.key === 'Enter') handleSaveEdit();
                                      if (e.key === 'Escape') handleCancelEdit();
                                    }}
                                    className={`${inputClass} text-sm px-3 py-2 rounded-lg shadow-sm`}
                                    autoFocus
                                  />
                                  <button
                                    onClick={handleSaveEdit}
                                    className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-all shadow-md"
                                  >
                                    <Save size={14} className="text-white" />
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="p-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition-all"
                                  >
                                    <X size={14} className="text-white" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 group">
                                  <span className="text-sm font-medium">{String(val ?? '-')}</span>
                                  {!isId && isSelected && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCellEdit(i, key, val);
                                      }}
                                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 transition-all"
                                    >
                                      <Edit size={12} className="text-blue-600" />
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}

                        <td className="py-3 px-4 text-center">
                          {isSelected && (
                            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-blue-600 text-white rounded-full font-bold shadow-md">
                              <CheckCircle2 size={12} />
                              Selected
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {loading && tableData.length > 0 && (
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'bg-gray-50'} flex items-center justify-center gap-3`}>
              <Loader2 className="animate-spin text-blue-600" size={18} />
              <span className="text-blue-600 text-sm font-medium">Updating...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}