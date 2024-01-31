import * as React from 'react'
import { Box, Menu, MenuItem, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { HouseOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'

const Breadcumb = (props: any) => {
    const router = useRouter()

    return (
        <Box
            className="breadcumb"
            sx={{
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'left',
            }}
        >
            <Typography variant="h6" sx={{ color: '#D0D2D6' }}>
                {props.name}
            </Typography>
            <Typography variant="h6" sx={{ color: '#3B4253' }}>
                |
            </Typography>
            <HouseOutlined
                className="breadcumbLink"
                onClick={() => router.push('/dashboard')}
                fontSize="medium"
                sx={{ color: '#7367F0' }}
            />
            <ArrowForwardIosOutlined
                fontSize="small"
                sx={{ color: '#D0D2D6', fontSize: '12px' }}
            />

            {props.linkList.map((data: any, i: number) => {
                const { link, linkName } = data
                return (
                    <Box
                        key={i}
                        sx={{
                            background: 'transparent',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography
                            className="breadcumbLink"
                            onClick={() => (window.location.href = link)}
                            variant="body1"
                        >
                            {linkName}
                        </Typography>
                        <ArrowForwardIosOutlined
                            fontSize="small"
                            sx={{ color: '#D0D2D6', fontSize: '12px' }}
                        />
                    </Box>
                )
            })}
            <Typography variant="body1" sx={{ color: '#B4B7BD' }}>
                {props.description}
            </Typography>
        </Box>
    )
}

export default Breadcumb
