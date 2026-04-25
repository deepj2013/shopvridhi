import { Router } from 'express';
import { Lead } from '../models/Lead.js';
import { PublicEvent } from '../models/PublicEvent.js';

const router = Router();

router.post('/leads', async (req, res) => {
  const { name, phone, shopType, sourcePage } = req.body || {};
  if (!name || !phone || !shopType) {
    return res.status(400).json({ message: 'name, phone and shopType are required' });
  }

  await Lead.create({
    name: String(name).trim(),
    phone: String(phone).trim(),
    shopType: String(shopType).trim(),
    sourcePage: String(sourcePage || 'contact').trim()
  });

  return res.status(201).json({ success: true });
});

router.post('/events', async (req, res) => {
  const { eventName, eventData } = req.body || {};
  if (!eventName) return res.status(400).json({ message: 'eventName is required' });

  await PublicEvent.create({
    eventName: String(eventName).trim(),
    eventData: eventData && typeof eventData === 'object' ? eventData : {},
    source: 'web'
  });

  return res.status(201).json({ success: true });
});

export default router;
