import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl glass-panel border shadow-2xl flex items-start space-x-3 transition-all animate-bounce-short ${
              isSuccess
                ? 'border-emerald-500/60 bg-emerald-950/80 text-emerald-100 glow-emerald'
                : isWarning
                ? 'border-amber-500/60 bg-amber-950/80 text-amber-100 glow-purple'
                : isError
                ? 'border-rose-500/60 bg-rose-950/80 text-rose-100'
                : 'border-cyan-500/60 bg-slate-900/90 text-slate-100 glow-cyan'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <Bell className="w-5 h-5 text-amber-400 animate-bounce" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-cyan-400" />}
            </div>

            <div className="flex-1 text-xs font-medium leading-tight">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
