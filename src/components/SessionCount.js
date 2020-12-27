import { Statistic } from 'antd';
import React, { useEffect, useState } from 'react'
import * as queries from "../graphql/queries";
import { API, graphqlOperation } from 'aws-amplify';
import { EyeOutlined } from '@ant-design/icons';

const SessionCount = ({ item }) => {

    const [sessionCount, setSessionCount] = useState(item.sessionCount)

    useEffect(() => { 
        // setInterval(async () => {
        //     await API.graphql(graphqlOperation(queries.getApiKey, { id : item.id }))
        //         .then(res => { 
        //             setSessionCount(res.data.getApiKey.sessionCount);
        //         })
        //         .catch(err => console.log(err))

        // }, 60000);
    }, [item.id]);

    return (
        <Statistic title={item.appName} value={sessionCount} prefix={<EyeOutlined />} />
    )
}

export default SessionCount
