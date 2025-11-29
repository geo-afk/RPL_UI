import React from "react";
import { AnalysisResponse, ErrorResponse, WarningResponse } from "../extra/types";

interface AnalysisMessageProps {
  response: AnalysisResponse | null | any;
}

const AnalysisMessages: React.FC<AnalysisMessageProps> = ({ response }) => {
  if (!response || Object.keys(response.message).length === 0) {
    return <p className="opacity-50">No analysis messages yet.</p>;
  }

  return (
    <div>
      {Object.entries(response.message).map(([key, value]) => {
        if (key === "errors" && Array.isArray(value)) {
          return (
            <div key={key} className="mb-4">
              <strong>Errors:</strong>
              <ul className="ml-4 list-disc">
                {(value as ErrorResponse[]).map((err, index) => (
                  <li key={index} className="mb-2">
                    <p><strong>Message:</strong> {err.message}</p>
                    <p><strong>Line:</strong> {err.line_number}, <strong>Column:</strong> {err.column_number}</p>
                    <p><strong>Error Code:</strong> {err.error_code}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        } else if (key === "warnings" && Array.isArray(value)) {
          return (
            <div key={key} className="mb-4">
              <strong>Warnings:</strong>
              <ul className="ml-4 list-disc">
                {(value as WarningResponse[]).map((warn, index) => (
                  <li key={index} className="mb-2">
                    <p><strong>Message:</strong> {warn.message}</p>
                    <p><strong>Line:</strong> {warn.line_number}, <strong>Column:</strong> {warn.column_number}</p>
                    <p><strong>Warning Code:</strong> {warn.warning_code}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        } else {
          // fallback for other keys
          return (
            <p key={key}>
              <strong>{key}:</strong> {String(value)}
            </p>
          );
        }
      })}
    </div>
  );
};

export default AnalysisMessages;
