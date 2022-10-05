import { useState, useEffect } from 'react'
import { Comment, List, PageHeader } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getComments } from '../services';

export default function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [commentsData, setCommentsData] = useState([])
    const { isLoading, data: comments } = useQuery(['comments', id], () =>
    getComments(id)
    );
    
    useEffect(() => {
        if (comments?.length > 0) {
            const modifiedData = comments.map(comment => {
                return {
                    author: comment.email,
                    title: comment.name,
                    content: comment.body
                }
            })
            setCommentsData(modifiedData)
        }
    }, [comments])
    
    return (
        <div className='container'>
            <PageHeader
                ghost={false}
                title='Comments'
                onBack={() => navigate(-1)}>
            </PageHeader>
            <List
                size="small"
                header={`${comments?.length ?? 0} replies`}
                loading={isLoading}
                dataSource={commentsData}
                rowKey="id"
                renderItem={item => (
                    <li>
                        <Comment
                            author={item.title}
                            datetime={item.author}
                            content={item.content}
                        />
                    </li>
                )}
            />
        </div>
    )
}
