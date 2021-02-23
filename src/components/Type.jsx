import React from "react";

function Type() {
  return (
    <div class="row mb-3">
      <label for="inputEmail3" class="col-sm-2 col-form-label">
        Type
      </label>
      <div class="col-sm-4">
        Multi-select
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            A Value is required
          </label>
        </div>
      </div>
    </div>
  );
}

export default Type;
