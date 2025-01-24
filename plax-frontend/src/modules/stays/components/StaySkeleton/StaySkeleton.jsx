import { Skeleton } from 'antd'

export const StaySkeleton = () => {
    return (
        <Skeleton
            active
            title={{ width: '100%', style: { height: "200px" } }}
            paragraph={{ rows: 0 }}
        />
    )
}
