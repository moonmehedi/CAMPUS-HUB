const express=require('express')
const router=express.Router()
const supabase=require('../../connection')
//
router.get('/',async(req,res)=>{
    try {
        const{data,error}=await supabase.from("notices").select("*");
        if (error) throw error
        const transformedData = data.map(item => {
            if (item.created_at && item.updated_at) {
                const originalTimestamp__create = new Date(item.created_at);
                const formattedTimestamp__create = originalTimestamp__create.toISOString().replace('T', ' ').slice(0, 19);
                const originalTimestamp__update = new Date(item.updated_at);
                const formattedTimestamp__update = originalTimestamp__update.toISOString().replace('T', ' ').slice(0, 19);
                return { ...item, created_at: formattedTimestamp__create, updated_at:formattedTimestamp__update }; 
            }
            return item;
        });
        res.status(200).json(transformedData);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})
router.post('/', async (req, res) => {
    const { admin_id,teacher_id, title, content,type } = req.body;
    if (!admin_id)
    {
        console.log(req.body)
        console.log(`Add Notice Teacher id:${teacher_id} Title:${title} content:${content} type:${type}`)
        try {
            const { data,error } = await supabase
                .from('notices')
                .insert({ teacher_id:teacher_id,
                    content:content,
                    title:title,
                    type:type,
                 })
                .select();
    
            if (error) return res.status(500).json({ error: error.message });
    
            res.status(201).json({ message: 'Notice created successfully',data });
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }    
    }
    else{
        console.log(`Add Notice Admin id:${admin_id} Title:${title} content:${content} type:${type}`)
        try {
            const { data,error } = await supabase
                .from('notices')
                .insert({ admin_id, title, content,type })
                .select();
    
            if (error) return res.status(500).json({ error: error.message });
    
            res.status(201).json({ message: 'Notice created successfully',data });
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { adminId,teacherId,content } = req.body;
    if(!adminId)
    {
        console.log(`Edit Notice Teacher Id:${teacherId} Edited Content:${content}`)
        try {
            const { data: notice, error: fetchError } = await supabase
                .from('notices')
                .select('teacher_id')
                .eq('notice_id', id)
                .single();
    
            if (fetchError || notice.teacher_id !== teacherId) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
    
            const { error } = await supabase
                .from('notices')
                .update({content})
                .eq('notice_id', id);
    
            if (error) return res.status(500).json({ error: error.message });
    
            res.status(200).json({ message: 'Notice updated successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    else{
        console.log(`Edit Notice Admin Id:${adminId} Edited Content:${content}`)
        try {
            const { data: notice, error: fetchError } = await supabase
                .from('notices')
                .select('admin_id')
                .eq('notice_id', id)
                .single();
    
            if (fetchError || notice.admin_id !== adminId) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
    
            const { error } = await supabase
                .from('notices')
                .update({content})
                .eq('notice_id', id);
    
            if (error) return res.status(500).json({ error: error.message });
    
            res.status(200).json({ message: 'Notice updated successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { teacherId,adminId } = req.body;
    if(!adminId)
    {
        console.log(`Delete Notice TeacherId: ${teacherId} NoticeId:${id}`)
        try {
            const { data: notice, error: fetchError } = await supabase
                .from('notices')
                .select('teacher_id')
                .eq('notice_id', id)
                .single();
    
            if (fetchError || notice.teacher_id !== teacherId) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
    
            const { error } = await supabase
                .from('notices')
                .delete()
                .eq('notice_id', id);
    
            if (error) return res.status(500).json({ error: error.message });
    
            res.status(200).json({ message: 'Notice deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }

    }
    else
    {
        console.log(`Delete Notice AdminId: ${adminId} NoticeId:${id}`)
        try {
            const { data: notice, error: fetchError } = await supabase
                .from('notices')
                .select('admin_id')
                .eq('notice_id', id)
                .single();
    
            if (fetchError || notice.admin_id !== adminId) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
    
            const { error } = await supabase
                .from('notices')
                .delete()
                .eq('notice_id', id);
    
            if (error) return res.status(500).json({ error: error.message });
    
            res.status(200).json({ message: 'Notice deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        } 
    }
});


module.exports = router;