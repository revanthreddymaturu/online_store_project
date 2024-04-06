import React from 'react'
function Message({errMessage}) {
    return (
            <div class="alert alert-dismissible alert-danger">
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                <strong>Oh snap!</strong> {errMessage}
        </div>
      )
}

export default Message
