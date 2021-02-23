import React, { Component } from 'react';
import axios from 'axios';

// Default state that page should be in upon loading
const INIT_STATE = {
  labelValue: '',
  defaultValue: '',
  choicesValue: '',
  typeValue: 'multi-select',
  checkBoxValue: false,
  errors: {
    labelValue: '',
    choicesValue: '',
  },
  orderValue: '',
};

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class FieldBuilder extends Component {
  state = {
    ...INIT_STATE,
  };

  /**
   * Check for duplicate values in the choices field
   */
  checkDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (value in valuesSoFar) {
        return true;
      }
      valuesSoFar[value] = true;
    }
    return false;
  }

  handleTypeChange = (event) => {
    const { value } = event.target;
    this.setState({ typeValue: value });
  };

  handleCheckBoxClick = () => {
    this.setState({ checkBoxValue: !this.state.checkBoxValue });
  };

  handleOrderValue = (event) => {
    const { value } = event.target;
    this.setState({ orderValue: value });
  };

  /**
   * Handles changes to Label field and checks whether it is filled or not,
   * Checks duplicates in the choices field and
   * Checks if total number of choices exceed 50
   */
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    if (name === 'labelValue') {
      errors.labelValue = value.length < 1 ? 'Label field is required' : '';
      this.setState({ errors, [name]: value });
    } else if (name === 'choicesValue') {
      if (value.split(/\r?\n/).length < 51) {
        let lastChar = value[value.length - 1];
        if (lastChar === '\n' || lastChar === '\r') {
          let duplicateCheck = this.checkDuplicates(value.split(/\r?\n/));
          if (duplicateCheck) {
            errors.choicesValue = 'Duplicate choices are not allowed!';
            this.setState((prevState) => {
              console.log(prevState);
              return {
                choicesValue: prevState.choicesValue,
                errors,
              };
            });
          } else {
            errors.choicesValue = '';
            this.setState({ errors, [name]: value });
          }
        } else {
          errors.choicesValue = '';
          this.setState({ errors, [name]: value });
        }
      } else {
        errors.choicesValue = 'Maximum choices allowed is 50';
        this.setState((prevState) => {
          return {
            choicesValue: prevState.choicesValue,
            errors,
          };
        });
      }
    } else {
      this.setState({ errors, [name]: value });
    }
  };

  /**
   * Checks if the default value is available in the Choices field
   */
  checkDefaultValueInChoices() {
    let errors = this.state.errors;
    let distinctChoices = this.state.choicesValue.split(/\r?\n/);
    let defaultValue = this.state.defaultValue;
    for (var i = 0; i < distinctChoices.length; ++i) {
      var value = distinctChoices[i];
      if (value === defaultValue) {
        return;
      }
    }
    if (distinctChoices.length > 49) {
      errors.choicesValue =
        'Cannot insert the default value in choices as the maximum allowed choices is 50. Please include default value as one of the choices!';
      this.setState((prevState) => {
        return {
          choicesValue: prevState.choicesValue,
          errors,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          choicesValue: prevState.choicesValue.concat('\n', defaultValue),
        };
      });
    }
  }

  /**
   * Checks if the lable field is empty or not while submitting the form
   */
  checkLabelValue() {
    let errors = this.state.errors;
    errors.labelValue =
      this.state.labelValue.length < 1 ? 'Label field is required' : '';
    this.setState((prevState) => {
      return {
        labelValue: prevState.labelValue,
        errors,
      };
    });
  }

  /**
   * Save changes click event
   */
  handleSaveChanges = (event) => {
    event.preventDefault();
    this.checkLabelValue();
    this.checkDefaultValueInChoices();
    if (validateForm(this.state.errors)) {
      console.info('Valid Form');
      event.preventDefault();
      const url = `https://www.mocky.io/v2/566061f21200008e3aabd919`;

      const data = {
        labelFieldSubmitted: this.state.labelValue,
        typeFieldSubmitted: this.state.typeValue,
        checkBoxFieldSubmitted: this.state.checkBoxValue,
        defaultValueSubmitted: this.state.defaultValue,
        choicesValueSubmitted: this.state.choicesValue.split(/\r?\n/),
        orderValueSubmitted: this.state.orderValue,
      };

      axios
        .post(url, { data })
        .then((res) => {
          console.log(res);
          console.log(JSON.parse(res.config.data));
          alert('Form submitted successfully!');
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert('Please correct the errors before submitting the form!');
      console.error('Invalid Form');
    }
  };

  handleClearButton = (event) => {
    this.state.labelValue('');
    this.state.defaultValue('');
    this.state.choicesValue('');
    this.state.typeValue('');
    this.state.checkBoxValue(false);
    this.state.errors.labelValue('');
    this.state.errors.choicesValue('');
  };

  /**
   * Render the component
   */
  render() {
    const { errors } = this.state;
    return (
      <form>
        <div className="App">
          <div
            className="card text-dark bg-light mb-3 card border-info"
            style={{ maxWidth: '33rem' }}
          >
            <div
              className="card-header custom-font"
              style={{ backgroundColor: '#daf5f2' }}
            >
              Field Builder
            </div>

            {/* Form Builder Card */}
            <div className="card-body">
              {/* Label field */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">
                  Label <span style={{ color: 'red' }}>*</span>
                </label>
                <div className="col-sm-6">
                  <input
                    value={this.state.labelValue}
                    onChange={this.handleChange}
                    name="labelValue"
                    maxLength={100}
                    type="text"
                    className="form-control"
                  />
                  {errors.labelValue.length > 0 && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.labelValue}
                    </span>
                  )}
                </div>
              </div>
              {/* End label field */}

              {/* starting type field */}
              <div className="mb-3 row col-sm">
                <label className="col-sm-3 col-form-label">Type</label>
                <div className="col-sm-6">
                  <select
                    id="type"
                    name="typeValue"
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    value={this.typeValue}
                    onChange={this.handleTypeChange}
                  >
                    <option value="single-select">Single-select</option>
                    <option value="multi-select">Multi-select</option>
                  </select>

                  {/* A value is required field */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={this.handleCheckBoxClick}
                      defaultChecked={this.state.checkBoxValue}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                      name="checkBoxValue"
                    >
                      A Value is Required
                    </label>
                  </div>
                  {/* ending value is required */}
                </div>
              </div>
              {/* Ending Type field */}

              {/* Starting the default value field */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Default Value</label>
                <div className="col-sm-6">
                  <input
                    value={this.state.defaultValue}
                    onChange={this.handleChange}
                    name="defaultValue"
                    maxLength={100}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              {/* end of default value field */}

              {/* Starting the choices text area */}
              <div className="mb-3 row">
                <label className="form-label col-sm-3 col-form-label">
                  Choices
                </label>
                <div className="col-sm-6">
                  <textarea
                    value={this.state.choicesValue}
                    name="choicesValue"
                    onChange={this.handleChange}
                    rows="6"
                    className="form-control"
                  ></textarea>
                  {errors.choicesValue.length > 0 && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.choicesValue}
                    </span>
                  )}
                </div>
              </div>
              {/* ending choices text area */}

              {/* Starting of the order field */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Order</label>
                <div className="col-sm-6">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={this.orderValue}
                    onChange={this.handleOrderValue}
                  >
                    <option defaultValue>Choose...</option>
                    <option value="order-alphabetically">
                      Order Alphabetically
                    </option>
                  </select>
                </div>
              </div>
              {/* Ending of order field */}

              {/* Starting the default value field */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label"></label>
                <div className="col-sm-6">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.handleSaveChanges}
                    name="orderValue"
                  >
                    Save Changes
                  </button>{' '}
                  or{' '}
                  <a
                    href="google.com"
                    className="link-danger"
                    style={{ textDecoration: 'none' }}
                  >
                    Cancel
                  </a>
                </div>
              </div>
              {/* End of order field */}

              {/* Starting Clear button field */}
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label"></label>
                <div className="col-sm-6">
                  <button
                    onClick={this.handleClearButton}
                    className="btn btn-dark"
                  >
                    Clear
                  </button>{' '}
                </div>
              </div>
              {/* Ending clear button screen */}
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default FieldBuilder;
