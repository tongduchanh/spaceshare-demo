import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  messgengerChat: {
    position: 'fixed',
    width: '60px',
    height: '60px',
    cursor: 'pointer',
    bottom: '24px',
    right: '24px',
    zIndex: '4',
  },
})

function MessengerChat() {
  const classes = useStyles()
  return (
    <div className={classes.messgengerChat}>
      <a
        href="https://www.facebook.com/messages/t/spaceshare.vn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="60px" height="60px" viewBox="0 0 60 60" cursor="pointer">
          <svg x="0" y="0" width="60px" height="60px">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g>
                <circle fill="#0084FF" cx="30" cy="30" r="30" />
                <svg x="10" y="10">
                  <g transform="translate(0.000000, -10.000000)" fill="#FFFFFF">
                    <g id="logo" transform="translate(0.000000, 10.000000)">
                      <path d="M20,0 C31.2666,0 40,8.2528 40,19.4 C40,30.5472 31.2666,38.8 20,38.8 C17.9763,38.8 16.0348,38.5327 14.2106,38.0311 C13.856,37.9335 13.4789,37.9612 13.1424,38.1098 L9.1727,39.8621 C8.1343,40.3205 6.9621,39.5819 6.9273,38.4474 L6.8184,34.8894 C6.805,34.4513 6.6078,34.0414 6.2811,33.7492 C2.3896,30.2691 0,25.2307 0,19.4 C0,8.2528 8.7334,0 20,0 Z M7.99009,25.07344 C7.42629,25.96794 8.52579,26.97594 9.36809,26.33674 L15.67879,21.54734 C16.10569,21.22334 16.69559,21.22164 17.12429,21.54314 L21.79709,25.04774 C23.19919,26.09944 25.20039,25.73014 26.13499,24.24744 L32.00999,14.92654 C32.57369,14.03204 31.47419,13.02404 30.63189,13.66324 L24.32119,18.45264 C23.89429,18.77664 23.30439,18.77834 22.87569,18.45674 L18.20299,14.95224 C16.80079,13.90064 14.79959,14.26984 13.86509,15.75264 L7.99009,25.07344 Z"></path>
                    </g>
                  </g>
                </svg>
              </g>
            </g>
          </svg>
        </svg>
      </a>
    </div>
  )
}
export default MessengerChat
