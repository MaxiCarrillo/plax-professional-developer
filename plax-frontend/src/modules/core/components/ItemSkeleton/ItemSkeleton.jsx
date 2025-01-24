import { Skeleton } from 'antd'

export const ItemSkeleton = () => {
    return (
        <Skeleton
            active
            title={{ width: '100%', style: { height: "90px" } }}
            paragraph={{ rows: 0 }}
        />
    )
}
