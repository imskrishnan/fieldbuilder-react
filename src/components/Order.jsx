import React from "react";

function Order() {
  return (
    <div class="row mb-3">
      <label for="defaultValue" class="col-sm-2 col-form-label">
        Order
      </label>
      <div class="col-sm-4">
        <select
          class="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
        >
          <option selected>Choose...</option>
          <option value="1">Order Alphabetically</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
  );
}

export default Order;
