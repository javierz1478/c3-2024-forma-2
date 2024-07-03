import Router from 'koa-router'
import getHealth from './health/health'
import getHistoricalEvents from '../domain/historical_events/use_cases/getHistoricalEvents'

const router = new Router()

router.get('/health', getHealth)
router.get('/api/history/:ocurrence', getHistoricalEvents.getHistoricalEventsByOcurrence)

export default router
