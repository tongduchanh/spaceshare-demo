import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

import { i18n, withTranslation } from '../i18n'

class Language extends React.Component {
    state = {
        dropdownOpen: false,
    }

    toggle = () => {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        })
    }

    setLang = lang => {
      if (lang === this.props.currentLanguage) {
        return;
      }
      i18n.changeLanguage(lang)
      location.reload()
    }

    render() {
        const {dropdownOpen} = this.state
        const {t} = this.props
        const language = i18n.language ? i18n.language : this.props.currentLanguage
        const arrFlag = {
          vi : '/static/images/vietnam.svg',
          eng : '/static/images/united-kingdom.svg',
        }
        return (
        <Dropdown 
          className="menu--dropdown language" 
          isOpen={dropdownOpen} 
          toggle={() => this.toggle()}
        >
          <DropdownToggle 
            tag="div"
            caret 
            className="language__info"
            data-toggle="dropdown"
          >
            <div className="language__flag align-item-center">
              <img src={arrFlag[language]} />
            </div>
            <div className="language__text">
              {t(language)}
            </div>
          </DropdownToggle>
          <DropdownMenu>
              <DropdownItem
                className="btn btn-link"
                onClick={() => this.setLang('vi')}
              >
                <span>
                  <img src={arrFlag['vi']} />
                </span>
                  {'Tiếng Việt'}
              </DropdownItem>
              <br />
              <DropdownItem
                className="btn btn-link"
                onClick={() => this.setLang('eng')}
              >
                <span>
                  <img src={arrFlag['eng']} />
                </span>
                  {'English'}
              </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        )
    }
}
Language.propTypes = {
  currentLanguage: PropTypes.string,
  t: PropTypes.func
}

export default withTranslation('common')(Language)
