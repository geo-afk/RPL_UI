export interface PolicyResponse {
    message: Record<string, any>;
}


export enum MarkerSeverity {
    Error = 8,
    Warning = 4,
    Info = 2,
    Hint = 1
}

export interface ErrorResponse {
    message: string;
    line_number: number;
    column_number: number;
    error_code: MarkerSeverity;
}

export interface WarningResponse {
    message: string;
    line_number: number;
    column_number: number;
    warning_code: MarkerSeverity;
}

// If the backend response has a "message" key containing errors/warnings
export interface AnalysisResponse {
    message: {
        errors?: ErrorResponse[];
        warnings?: WarningResponse[];
        [key: string]: any; // fallback for other keys
    };
}
