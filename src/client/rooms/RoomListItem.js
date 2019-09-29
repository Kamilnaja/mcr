import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RoomListItem(props) {
  return (
    <div>
      <li key={props.item._id}>
        <div className="room-item">
          <Link to={`/room/${props.item._name}/${props.item._id}`} onClick={() => props.addUser(props.item)}>
            {props.item._name}
          </Link>
          <div>
            <div className="users-count">
              users:
              {props.item._usersIds.length}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

RoomListItem.propTypes = {
  item: PropTypes.shape({
    _name: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired,
    _usersIds: PropTypes.array.isRequired
  }),
  addUser: PropTypes.func.isRequired
};

RoomListItem.defaultProps = {
  item: {}
};
