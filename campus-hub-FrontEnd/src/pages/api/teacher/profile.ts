import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { getCurrentTimestamp } from '@/utils/timestamp'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const timestamp = getCurrentTimestamp()

  if (req.method === 'GET') {
    if (req.session.teacher) {
      try {
        const { teacher_id } = req.session.teacher

        // Query teacher details from database
        const { data: teacher, error } = await supabase
          .from('teacher')
          .select('*')
          .eq('teacher_id', teacher_id)
          .single()

        if (error || !teacher) {
          return res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve teacher details',
            timestamp
          })
        }

        res.json({
          success: true,
          teacher,
          timestamp
        })
      } catch (error) {
        console.error(`[${timestamp}] Profile fetch error:`, error)
        res.status(500).json({ 
          success: false, 
          message: 'Internal server error',
          timestamp
        })
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
        timestamp
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
