import React from "react";

function DefaultValue() {
  return (
    <div class="row mb-3">
      <label for="defaultValue" class="col-sm-2 col-form-label">
        Default Value
      </label>
      <div class="col-sm-4">
        <input
          class="form-control"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
        />
      </div>
    </div>
  );
}

export default DefaultValue;
