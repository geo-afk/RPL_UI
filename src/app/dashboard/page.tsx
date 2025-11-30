"use client"

import React, { useContext, useState } from 'react';
import { 
  BookOpen, Code, Shield,CheckCircle, ArrowRight, 
  PlayCircle, FileText, Lightbulb,Sparkles
} from 'lucide-react';
import { Examples, Features, getKeywords, getOperatorsAndExpressions, getTemplateString, getThemeClasses, TutorialSteps } from './utils/utils';
import "./Dashboard.css"
import { ThemeContext } from '@/theme/ThemeContext';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentStep, setCurrentStep] = useState(0);

  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme
  const themMode = themeContext?.isDarkMode()


  function isDarkMode() {
    return themMode ?? true
  }
  

  


  const {
    accent,
    accentBg,
    accentHover,
    accentText,
    primaryButton,
    bgClass,
    textClass,
    borderClass,
    mutedBg,
  } = getThemeClasses(isDarkMode())
 

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'tutorial', label: 'Interactive Tutorial', icon: PlayCircle },
    { id: 'examples', label: 'Code Examples', icon: Code },
    { id: 'syntax', label: 'Syntax Guide', icon: FileText }
  ];

  return (
    <div className={`min-h-screen ${bgClass} p-6 transition-colors duration-300`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-3 ${isDarkMode() ? 'bg-indigo-600' : 'bg-indigo-700'} rounded-xl shadow-lg`}>
              <Shield className="text-white" size={34} />
            </div>
            <div>
              <h1 className={`text-4xl font-bold ${isDarkMode() ? 'text-white' : 'text-gray-900'}`}>
                Resource Policy Language
              </h1>
              <p className={`text-sm ${textClass} flex items-center gap-2 mt-1`}>
                <Sparkles size={16} className="text-yellow-500" />
                Define access control policies in a simple, human-readable format
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative rounded-xl p-4 transition-all duration-300 border ${
                  isActive
                    ? `${isDarkMode() ? 'bg-indigo-600 border-indigo-500' : 'bg-indigo-600 border-indigo-700'} text-white shadow-xl scale-105`
                    : `${theme?.cardClass} ${borderClass} hover:border-indigo-500 hover:shadow-md ${accentHover}`
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-2 rounded-lg transition-all ${isActive ? 'bg-white/20' : accentBg}`}>
                    <Icon size={24} className={isActive ? 'text-white' : accent} />
                  </div>
                  <span className={`text-sm font-semibold ${isActive ? 'text-white' : ''}`}>
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* What is RPL */}
            <div className={`${theme?.cardClass} rounded-xl p-8 border ${borderClass} shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="flex items-start gap-4">
                <div className={`p-4 ${isDarkMode() ? 'bg-indigo-600' : 'bg-indigo-700'} rounded-xl shadow-lg`}>
                  <Shield className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3">What is RPL?</h2>
                  <p className={`${textClass} text-lg leading-relaxed mb-4`}>
                    RPL (Resource Policy Language) is a domain-specific language designed for defining 
                    access control policies in a clear, maintainable way. Think of it as a modern 
                    alternative to complex IAM policies or RBAC configurations.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Human-Readable', 'Type-Safe', 'Production-Ready'].map(tag => (
                      <span key={tag} className={`${isDarkMode() ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-800'} px-4 py-2 rounded-full text-sm font-medium`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className={`${theme?.cardClass} rounded-xl p-6 border ${borderClass} hover:shadow-xl transition-all hover:scale-105`}>
                    <div className={`p-3 ${accentBg} rounded-xl inline-block mb-4`}>
                      <Icon size={24} className={accent} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className={textClass}>{feature.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Start */}
            <div className={`${theme?.cardClass} rounded-xl p-8 border ${borderClass} hover:shadow-lg transition-shadow`}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className={`p-2 ${accentBg} rounded-lg`}>
                  <Lightbulb className={accent} size={28} />
                </div>
                Quick Start Guide
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Define Your Roles", desc: "Create roles like Admin, Developer, Guest with their permissions" },
                  { title: "Assign Users to Roles", desc: "Map your users to their appropriate roles" },
                  { title: "Define Resources", desc: "Specify what needs protection (databases, APIs, files)" },
                  { title: "Create Policy Rules", desc: "Write ALLOW and DENY rules with optional conditions" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className={`shrink-0 w-10 h-10 ${isDarkMode() ? 'bg-indigo-600' : 'bg-indigo-700'} text-white rounded-xl flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1 text-lg">{step.title}</p>
                      <p className={textClass}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interactive Tutorial Tab */}
        {activeTab === 'tutorial' && (
          <div className="space-y-6 animate-fade-in">
            {/* Progress Bar */}
            <div className={`${theme?.cardClass} rounded-xl p-6 border ${borderClass} shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Tutorial Progress</h3>
                <span className={`${accentBg} ${accentText} px-4 py-2 rounded-full text-sm font-bold`}>
                  Step {currentStep + 1} of {TutorialSteps.length}
                </span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className={`${isDarkMode() ? 'bg-indigo-600' : 'bg-indigo-700'} h-full transition-all duration-500`}
                  style={{ width: `${((currentStep + 1) / TutorialSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Step */}
            <div className={`${theme?.cardClass} rounded-xl p-8 border ${borderClass} shadow-lg`}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-4 ${isDarkMode() ? 'bg-indigo-600' : 'bg-indigo-700'} rounded-xl shadow-lg`}>
                  {React.createElement(TutorialSteps[currentStep].icon, {
                    className: "text-white",
                    size: 40
                  })}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{TutorialSteps[currentStep].title}</h2>
                  <p className={`${textClass} text-lg`}>{TutorialSteps[currentStep].explanation}</p>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 mb-6 overflow-x-auto shadow-lg border border-gray-800">
                <pre className="text-green-400 font-mono text-sm leading-relaxed">
                  {TutorialSteps[currentStep].code}
                </pre>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    currentStep === 0
                      ? 'opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-700'
                      : `${mutedBg} hover:shadow-md`
                  }`}
                >
                  ← Previous
                </button>
                {currentStep < TutorialSteps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className={`${primaryButton} text-white px-6 py-3 rounded-xl font-medium hover:shadow-xl transition-all flex items-center gap-2`}
                  >
                    Next Step <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentStep(0);
                      setActiveTab('examples');
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <CheckCircle size={18} /> Complete Tutorial
                  </button>
                )}
              </div>
            </div>

            {/* All Steps Overview */}
            <div className={`${theme?.cardClass} rounded-xl p-6 border ${borderClass}`}>
              <h3 className="text-xl font-bold mb-4">All Steps</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {TutorialSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      idx === currentStep
                        ? `border-indigo-600 ${isDarkMode() ? 'bg-indigo-900/30' : 'bg-indigo-50'} shadow-lg`
                        : `${borderClass} hover:border-indigo-500`
                    }`}
                  >
                    <div className="text-center">
                      <div className={`p-2 rounded-lg mx-auto mb-2 inline-block ${idx === currentStep ? accentBg : mutedBg}`}>
                        {React.createElement(step.icon, {
                          className: idx === currentStep ? accent : 'opacity-50',
                          size: 24
                        })}
                      </div>
                      <p className="text-sm font-medium">{step.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="space-y-6 animate-fade-in">
            <div className={`${theme?.cardClass} rounded-xl p-6 border ${borderClass} ${accentBg}`}>
              <h2 className="text-2xl font-bold mb-2">Real-World Examples</h2>
              <p className={textClass}>Common patterns you can use in your policies</p>
            </div>

            {Examples.map((example, idx) => (
              <div key={idx} className={`${theme?.cardClass} rounded-xl p-6 border ${borderClass} hover:shadow-xl transition-all hover:scale-[1.02]`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`${isDarkMode() ? 'bg-indigo-600' : 'bg-indigo-700'} text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm`}>
                        {idx + 1}
                      </span>
                      <h3 className="text-xl font-bold">{example.title}</h3>
                    </div>
                    <p className={textClass}>{example.description}</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-5 overflow-x-auto shadow-lg border border-gray-800">
                  <pre className="text-green-400 font-mono text-sm leading-relaxed">
                    {example.code}
                  </pre>
                </div>
              </div>
            ))}

            
          </div>
        )}

        {/* Syntax Guide Tab */}
        {activeTab === 'syntax' && (
          <div className="space-y-6 animate-fade-in">
            <div className={`${theme?.cardClass} rounded-xl p-6 border ${borderClass} ${accentBg}`}>
              <h2 className="text-2xl font-bold mb-2">Complete Syntax Reference</h2>
              <p className={textClass}>Full RPL language specification</p>
            </div>

            {/* Keywords */}
            <div className={`${theme?.cardClass} rounded-xl p-6 border ${borderClass}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <div className={`p-2 ${accentBg} rounded-lg`}>
                  <Code size={24} className={accent} />
                </div>
                Language Keywords
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                { getKeywords().map(kw => (
                  <div key={kw} className={`${mutedBg} rounded-lg p-4 font-mono font-bold text-center hover:scale-105 transition-transform shadow-md`}>
                    {kw}
                  </div>
                ))}
              </div>
            </div>

            {/* Operators */}
            <div className={`${theme?.cardClass} rounded-xl p-6 border ${borderClass}`}>
              <h3 className="text-xl font-bold mb-4">Operators & Expressions</h3>
              <div className="space-y-3">
                { getOperatorsAndExpressions().map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <code className={`${isDarkMode() ? 'bg-indigo-600' : 'bg-indigo-700'} text-white px-4 py-2 rounded-lg font-mono font-bold shadow-md min-w-[140px] text-center`}>
                      {item.op}
                    </code>
                    <span className={textClass}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Structure */}
            <div className={`${theme?.cardClass} rounded-xl p-6 border ${borderClass}`}>
              <h3 className="text-xl font-bold mb-4">Policy Structure Template</h3>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto shadow-lg border border-gray-800">
                <pre className="text-green-400 font-mono text-sm leading-relaxed">
                  { getTemplateString() }
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}