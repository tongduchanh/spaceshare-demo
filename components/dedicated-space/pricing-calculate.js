import React from 'react'
import PropTypes from 'prop-types'

import {AppUtils} from '../../utils'
import {PricingType} from '../../constants'
import { withTranslation } from '../../i18n'

function PricingCalculate({pricing, rate_type, t}) {
  let duration = ''
  if (rate_type == PricingType.HOURLY_RATE) {
    duration = t('hour')
  } else if(rate_type == PricingType.DAILY_RATE) {
    duration = t('day')
  } else if(rate_type == PricingType.DAILY_RATE) {
    duration = t('shift')
  }
  return (
    <React.Fragment>
      {pricing && Object.keys(pricing).length > 0 && (
        <div className="pricing">
          <div className="title title--small mb--6">
            {t('serivce-price')}
          </div>
          <div className="d-flex pricing__item justify-content-between">
            <div className="">{AppUtils.number_format(pricing.rate)} VNĐ x {pricing.duration}{` `} {duration}</div>
            <div className="">{AppUtils.number_format(pricing.service_pricing)} VNĐ</div>
          </div>
          <div className="d-flex pricing__item justify-content-between">
            <div>{t('cleaning-price')}</div>
            <div>{AppUtils.number_format(pricing.cleaning_pricing)} VNĐ</div>
          </div>
          {pricing.attendee_pricing > 0 && (
            <div className="d-flex pricing__item justify-content-between">
              <div>{t('attendee-price')}</div>
              <div>{AppUtils.number_format(pricing.attendee_pricing)} VNĐ</div>
            </div>
          )}
          <hr style={{marginTop: `1rem`, marginBottom: `1rem`}} />

          <div className="d-flex pricing__item justify-content-between">
            <div className="text-tg">{t('total-amount')}</div>
            <div className="text-tg">{AppUtils.number_format(pricing.total_amount)} VNĐ</div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

PricingCalculate.propTypes = {
  t: PropTypes.func,
  pricing: PropTypes.object,
  rate_type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default (withTranslation('common')(PricingCalculate))
