import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const DEFAULT_TEST_SITE_KEY = '1x00000000000000000000AA';

let scriptPromise = null;

function loadTurnstileScript() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window not available'));
  if (window.turnstile) return Promise.resolve(window.turnstile);

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src*="challenges.cloudflare.com/turnstile"]`);
      if (existingScript) {
        if (window.turnstile) {
          resolve(window.turnstile);
          return;
        }
        existingScript.addEventListener('load', () => resolve(window.turnstile));
        existingScript.addEventListener('error', (err) => reject(err));
        return;
      }

      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = (error) => {
        scriptPromise = null;
        reject(error);
      };
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

const TurnstileWidget = forwardRef(function TurnstileWidget(
  {
    siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || DEFAULT_TEST_SITE_KEY,
    onSuccess,
    onError,
    onExpire,
    theme = 'dark',
    size = 'normal',
    action = 'form_submission',
    className = '',
  },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const callbacksRef = useRef({ onSuccess, onError, onExpire });

  // Update callbacks ref on every render to avoid stale closures
  callbacksRef.current = { onSuccess, onError, onExpire };

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {
          // ignore if already destroyed
        }
      }
    },
    getResponse: () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        return window.turnstile.getResponse(widgetIdRef.current);
      }
      return null;
    },
  }));

  useEffect(() => {
    let isMounted = true;

    loadTurnstileScript()
      .then((turnstile) => {
        if (!isMounted || !containerRef.current || !turnstile) return;

        // Clean up previous widget if any
        if (widgetIdRef.current !== null) {
          try {
            turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
          widgetIdRef.current = null;
        }

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          size,
          action,
          callback: (token) => {
            if (callbacksRef.current.onSuccess) {
              callbacksRef.current.onSuccess(token);
            }
          },
          'error-callback': (errorCode) => {
            if (callbacksRef.current.onError) {
              callbacksRef.current.onError(errorCode);
            }
          },
          'expired-callback': () => {
            if (callbacksRef.current.onExpire) {
              callbacksRef.current.onExpire();
            }
          },
        });
      })
      .catch((err) => {
        if (callbacksRef.current.onError) {
          callbacksRef.current.onError(err);
        }
      });

    return () => {
      isMounted = false;
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, theme, size, action]);

  return (
    <div className={`turnstile-container flex justify-center my-2 ${className}`}>
      <div ref={containerRef} className="min-h-[65px] min-w-[300px] flex items-center justify-center" />
    </div>
  );
});

export default TurnstileWidget;
