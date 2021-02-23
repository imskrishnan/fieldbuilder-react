import React from "react";

function Label() {
  return (
    <div class="row mb-3">
      <label for="labelText" class="col-sm-2 col-form-label">
        Label
      </label>
      <div class="col-sm-4">
        <input type="text" class="form-control" id="labelText" />
      </div>
    </div>
  );
}

export default Label;
