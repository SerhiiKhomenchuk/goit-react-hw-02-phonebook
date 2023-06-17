import React from 'react';

const ContactList = ({ visibleContact, deleteContact }) => {
  return (
    <div>
      <ul className="list-group">
        {visibleContact.map(({ name, number, id }) => {
          return (
            <li
              key={id}
              id={id}
              className="list-group-item  d-flex justify-content-between fs-3 list-group-item-action list-group-item-warning"
            >
              <span>{name}:</span>
              <span>{number}</span>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => deleteContact(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
