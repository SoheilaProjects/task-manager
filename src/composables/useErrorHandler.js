import { ref, onUnmounted } from "vue";

export function useErrorHandler() {
  const errorMessage = ref("");
  let errorTimeout;

  function handleError(error, message, autoDismiss = true) {
    console.error(error);

    errorMessage.value = message;

    clearTimeout(errorTimeout);

    if (autoDismiss) {
      errorTimeout = setTimeout(() => {
        errorMessage.value = "";
      }, 5000);
    }
  }

  function clearError() {
    errorMessage.value = "";
    clearTimeout(errorTimeout);
  }

  onUnmounted(() => {
    clearTimeout(errorTimeout);
  });

  return {
    errorMessage,
    handleError,
    clearError,
  };
}
