import React from "react";

function Choices() {
  return (
    <div class="row mb-3">
      <label for="defaultValue" class="col-sm-2 col-form-label">
        Choices
      </label>
      <div class="col-sm-4">
        {/* <!--<input class="form-control" type="text" placeholder="Default input" aria-label="default input example">--> */}
        <div class="list-group">
          <label class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="" />
            Asia
          </label>
          <label class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="" />
            Australia
          </label>
          <label class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="" />
            Europe
          </label>
          <label class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="" />
            Americas
          </label>
          <label class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="" />
            Africa
          </label>
        </div>
      </div>
    </div>
  );
}

export default Choices;
