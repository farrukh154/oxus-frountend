# DynamicDataTable Component

## Component Description

The `DynamicDataTable` component is a versatile component designed to handle CRUD (Create, Read, Update, Delete) operations dynamically. It interfaces with a server-side API and offers a comprehensive suite of features including data display, sorting, pagination, filtering, exporting, editing, and deletion.

## Props

- **`tableTitle`** (String): The title of the data table.
- **`appName`** (String): The application identifier for API requests.
- **`modelName`** (String): The model name related to the CRUD operations.
- **`canEdit`** (Boolean): Enables editing functionality if set to `true`. **Not implemented yet.**
- **`canDelete`** (Boolean): Enables deletion functionality if set to `true`. **Not implemented yet.**
- **`canExport`** (Boolean): Enables exporting functionality if set to `true`. **Not implemented yet.**
- **`skipFields`** (String): A comma-separated list of field names to exclude from the table.

## Features

1. **Data Table**: Presents data in a table format, fetched and processed from the server-side.
2. **Pagination**: Users can navigate through the dataset page by page.
3. **Sorting**: Enables data sorting based on selected table columns.
4. **Filtering**: Allows data to be filtered based on specified criteria.
5. **Edit Functionality**: Facilitates the editing of records (conditional on `canEdit`).
6. **Delete Functionality**: Allows for the deletion of records (conditional on `canDelete`).
7. **Exporting Functionality**: Allows exporting functionality of records (conditional on `canExport`).

## Integration Steps

1. **Import the Component**: Include `DynamicDataTable` in your Vue.js project.
2. **Set Up Props**: Pass the required props (`tableTitle`, `appName`, `modelName`, `canEdit`, `canDelete`, `skipFields`) to the component.
3. **Configure API**: Make sure the backend API aligns with the expected request and response format for CRUD operations.

## Usage

```html
<dynamic-data-table
    tableTitle="Users"
    appName="users"
    modelName="users"
    :can-edit="false"
    :can-delete="false"
    :can-export="false"
    skipFields="password"
></dynamic-data-table>

<script>
import DynamicDataTable from "~/components/dynamic-data-table.vue";
</script>
```

In this example, replace the prop values with those relevant to your application.

## Additional Notes

- The component requires a compatible backend API to perform CRUD operations.
- It's important that the user making requests through this component has the necessary permissions on the application model.