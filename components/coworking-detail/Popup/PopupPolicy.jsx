import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles({
  policyContent: {
    overflow: 'auto',
    maxHeight: '406px',
    border: '1px solid #d1d1d1',
    borderRadius: '4px',
    padding: '12px',
    background: '#fafafa',
  },
  checkboxShow: {
    marginTop: '24px'
  }
})

function PopupPolicy(props) {
  const { isOpen, toggle, onSubmit, processing } = props
  const spacePolicy = props.spacePolicy?.data?.policy
  const classes = useStyles()
  const [checked, setChecked] = React.useState(false)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="ss-modal">
      <div className="modalHeader">
        <div className="modalHeader__icon modalHeader__icon--warning">
          <img src="/static/images/icons/exclamation.svg" />
        </div>
        <div className="modalHeader__title"> Điều khoản sử dụng</div>
        <div className="modalHeader__close" onClick={toggle}>
          <span aria-hidden="true">×</span>
        </div>
      </div>
      <div className="modalBody">
        <div className={classes.policyContent}>
          <div dangerouslySetInnerHTML={{ __html: spacePolicy }} />
        </div>
        <div className={classes.checkboxShow}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Tôi đã đọc và đồng ý với điều khoản sử dụng coworking space"
          />
        </div>
      </div>
      <div className="modalFooter">
        <div className="text-center">
          <Button
            color="primary"
            className="mr-3"
            onClick={() => onSubmit(checked)}
            disabled={processing || !checked}
          >
            Đặt lịch ngay
          </Button>
        </div>
      </div>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  spacePolicy: state.coworking.spacePolicy,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PopupPolicy)
