import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PageWrapper from '../pageWrapper'
import {
  deleteNotification,
  getNotifications
} from './actions'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Appointments = () => {
  const dispatch = useDispatch()

  const {
    notifications
  } = useSelector(({notificationsState}) => notificationsState)

  useEffect(() => {
    dispatch(getNotifications())
  }, [dispatch])

  const handleDelete = e => {
    dispatch(deleteNotification(e.target.id))
  }

  return (
    <PageWrapper
      className={PageWrapper.WrapperClassNames.notifications}
      showSideBar
    >
      <div className="content__top">
        <div className="top__content">
          <h1 className="page__title">Notifications</h1>
        </div>
      </div>
      <div className="content__block">
        <section className="notififcations">
          <div className="notififcations__page">
            <div className="notififcations__list">
              {!notifications.length && <p className='no_notifications'>You don't have any notifications</p>}
              {notifications.map(item =>
                <div className="list__item shit1">
                  <div className='delete' id={item.id} onClick={handleDelete}>×</div>
                  <div className="card">
                    <div className="notififcation__time">{moment(item.attributes.create_at).format('HH:MM')}</div>
                    <span className="card__text">
                      <Link className="notififcation__patient" to={`/patients/${item.attributes.user_id}`}>{item.attributes.user_name}</Link>
                      {' '}
                      <span className="notififcation__text">{item.attributes.message}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}

export default Appointments;
