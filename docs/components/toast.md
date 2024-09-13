# Toast

The Toast plugin, located in `/plugins/toast.ts`, and its helper in `/utils/toast.ts`, utilize the `vue3-toastify`
package for toast notifications.

#### Usage

Use the functions from `/utils/toast` for various toasts.

```typescript
import {toastInfo, toastSuccess, toastError, toastWarning, toastMake} from "../utils/toast";

function testToast() {
    toastInfo("Info");
    toastError("Error");
    toastSuccess("Success");
    toastWarning("Warning");
    toastMake("Custom message", { /* configurations */});
}
```

Customize the `toastMake` function with additional configurations. Integrating toasts is now straightforward, enhancing
user experience with informative notifications.
