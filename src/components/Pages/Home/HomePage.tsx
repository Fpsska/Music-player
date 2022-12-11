import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'

import {
  switchPlaylistPageStatus,
  switchPlayerPageStatus
} from '../../../app/slices/mainSlice'
import {
  switchCurtainStatus
} from '../../../app/slices/burgerSlice'

import Slider from '../../Slider/Slider'
import BurgerMenu from '../../BurgerMenu/Burger'

// /. imports

const HomePage: React.FC = () => {
  const { albumList } = useAppSelector(state => state.playerSlice)
  const { isBurgerOpen } = useAppSelector(state => state.burgerSlice)
  //
  const [isVisible, setIsVisible] = useState(true)
  //
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  //
  const goPlayListPage = (): void => {
    dispatch(switchPlaylistPageStatus(true))
    navigate('playlist')
  }
  //
  const goPlayerPage = (): void => {
    dispatch(switchPlayerPageStatus(true))
    navigate('player')
  }

  useEffect(() => {
    setIsVisible(!isVisible)
  }, [isBurgerOpen])

  useLayoutEffect(() => {
    const defineCurtainStatus = (): void => {
      if (window.innerWidth >= 768) {
        dispatch(switchCurtainStatus(false))
      } else {
        dispatch(switchCurtainStatus(true))
      }
    }

    window.addEventListener('resize', defineCurtainStatus)
    window.addEventListener('load', defineCurtainStatus)
    return () => {
      window.removeEventListener('resize', defineCurtainStatus)
      window.removeEventListener('load', defineCurtainStatus)
    }
  }, [])
  // 
  return (
    <>
      <div className="page__burger">
        {isBurgerOpen ? <BurgerMenu /> : <></>}
      </div>
      <div className="home">
        <div className="home__section home__section--recommendation">
          <span className="page__title title" onClick={goPlayerPage}>
            <Link to="player">Recomended for you</Link>
          </span>
          <div className="home__slider">
            <Slider data={albumList} name={'recomended'} />
          </div>
        </div>
        <div className="home__section home__section--playlist">
          <span className="page__title title" onClick={goPlayListPage}>
            <Link to="playlist">My Playlist</Link>
          </span>
          <Slider data={albumList} name={'playlist'} />
        </div>
        <div className="home__section home__section--playlist">
          <span className="page__title title" onClick={goPlayListPage}>
            <Link to="playlist">Test</Link>
          </span>
          <Slider data={albumList} name={'test'} />
        </div>
      </div>
    </>
  )
}

export default HomePage
