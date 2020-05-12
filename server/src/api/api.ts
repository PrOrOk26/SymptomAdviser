import express from 'express'
import credentials from './keys'

const router = express.Router()

const headers = () => {
  return {
    'content-type': 'application/json',
    ...credentials,
  };
}

router.get('/risk_factors', (req, res) => {
  
})

export { router as api }

