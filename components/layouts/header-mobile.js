import React, {useState, useEffect} from 'react'
import ReactDrawer from 'react-drawer'
import Link from 'next/link'
import {Nav, NavItem, NavLink} from 'reactstrap'

import DrawerMenu from './drawer-menu'
import SearchType from '../search/search-type'
import SearchMobile from '../search/search-mobile'

function HeaderMobile(props) {
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const toggleDrawer = () => setOpenMenu(prevState => !prevState)
  const onDrawerClose = () => {
    setOpenMenu(false)
  }

  useEffect(() => {
    if (openMenu) {
      document.body.classList.add('drawer-open')
      document.body.classList.add('body-overflow-hidden')
    } else {
      document.body.classList.remove('drawer-open')
      document.body.classList.remove('body-overflow-hidden')
    }
  }, [openMenu])

  useEffect(() => {
    if (openSearch) {
      document.body.classList.add('body-overflow-hidden')
    } else {
      document.body.classList.remove('body-overflow-hidden')
    }
  }, [openSearch])

  return (
    <div className="header--medium">
      <header className="header__regular header__mobile d-flex justify-content-between ">
        <div>
          <button
            className="drawer-btn p-0"
            onClick={toggleDrawer}
          >
            <span className="drawer-btn-icon" />
          </button>
          <ReactDrawer
            open={openMenu}
            position="left"
            onClose={onDrawerClose}
          >
            <DrawerMenu 
              onClick={onDrawerClose}
              currentLanguage={props.currentLanguage}
            />
          </ReactDrawer>
        </div>
        <div className="header__logo">
          <Link href="/">
            <a className="header__logo align-item-center">
              <img alt="logo" className="logo" src="/static/images/logo.png" />
            </a>
          </Link>
        </div>
        <div className="header__search">
          {!openSearch ? (
            <img src="/static/images/search-black.svg" width={20} onClick={() => setOpenSearch(true)} />
          ) : (
            <img src="/static/images/icons/close1.svg" width={18} onClick={() => setOpenSearch(false)} />
          )}
          {openSearch && (
            <React.Fragment>
              <SearchMobile close={() => setOpenSearch(false)} />
            </React.Fragment>
          )}
        </div>
      </header>
    </div>
  )
}

export default HeaderMobile
