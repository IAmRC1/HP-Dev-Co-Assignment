import { useState, useEffect } from 'react';
import { Table, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../services.js';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (_text, record) => <Link to={`comments/${record.id}`}>{record.title}</Link>
    },
    {
        title: 'User Name',
        dataIndex: 'username',
        key: 'username',
    },
  ];

export default function Home() {
    const [userPosts, setUserPosts] = useState([]);
    const { isLoading: postsLoading, data: posts } = useQuery(['posts'], () =>
      getData()
    );
    const { isLoading: usersLoading, data: users } = useQuery(['users'], () =>
      getData('users')
    );
    
    useEffect(() => {
      if (posts?.length > 0 && users?.length > 0) {
        const mappedData = posts.slice(0, 10).map((post, i) => {
          return { id: post.id, title: post.title, username: users[i]?.username };
        });
        setUserPosts(mappedData)
      }
    }, [posts, users]);

    return (
        <div className='container'>
            <PageHeader
                title='Posts with User'
                subTitle="Showing only 10 posts as only 10 users in DB"
            >
            </PageHeader>
            <Table
                rowKey="id"
                size="small"
                loading={postsLoading || usersLoading}
                dataSource={userPosts}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}
