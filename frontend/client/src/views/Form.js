import React from "react";

function Form() {
  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
            Surname:
            <input type="text" name="Surname" />
        </label>
        <label>
            Email:
            <input type="text" name="Email" />
        </label>
        <label>
            Phone Number:
            <input type="text" name="PhoneNumber" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Form;
