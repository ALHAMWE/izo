import React from 'react';
import {
    CardContent,
    Stepper,
    Step,
    StepLabel,
    useTheme,
    useMediaQuery,
    Typography,
    Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomAvatar from 'src/@core/components/mui/avatar';
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba';

const SidebarStepperWrapper = styled(CardContent)(({ theme }) => ({
    borderRight: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
    width: { xs: '100%', md: 280 },
    minWidth: { xs: 'auto', md: 280 },
    px: 0,
    py: 3,
    [theme.breakpoints.down('md')]: {
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
        py: 2
    }
}));

const MobileStepContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    width: '100%',
    overflowX: 'auto',
    py: 1,
    '&::-webkit-scrollbar': {
        display: 'none'
    },
    scrollbarWidth: 'none'
}));

const MobileStep = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: active ? hexToRGBA(theme.palette.primary.main, 0.08) : 'transparent',
    border: active ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: active ? hexToRGBA(theme.palette.primary.main, 0.12) : theme.palette.action.hover
    }
}));

const SidebarStepper = ({ steps, activeStep, onStepClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (isMobile) {
        return (
            <SidebarStepperWrapper>
                <MobileStepContainer>
                    {steps.map((step, idx) => (
                        <MobileStep
                            key={idx}
                            active={activeStep === idx}
                            onClick={() => onStepClick && onStepClick(idx)}
                            tabIndex={0}
                            sx={{
                                outline: activeStep === idx ? `2px solid ${theme.palette.primary.main}` : undefined
                            }}
                        >
                            <CustomAvatar
                                variant="rounded"
                                skin={activeStep === idx ? 'filled' : 'light'}
                                color={activeStep >= idx ? 'primary' : 'secondary'}
                                sx={{
                                    width: 36,
                                    height: 36,
                                    fontSize: '1rem',
                                    boxShadow: activeStep === idx
                                        ? `0 2px 4px 0 ${hexToRGBA(theme.palette.primary.main, 0.3)}`
                                        : 'none',
                                }}
                            >
                                {step.icon}
                            </CustomAvatar>
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 0.5,
                                    fontWeight: activeStep === idx ? 600 : 400,
                                    color: activeStep === idx ? 'primary.main' : 'text.secondary',
                                    fontSize: '0.7rem',
                                    textAlign: 'center',
                                    lineHeight: 1.2
                                }}
                            >
                                {step.title || step.label}
                            </Typography>
                        </MobileStep>
                    ))}
                </MobileStepContainer>
            </SidebarStepperWrapper>
        );
    }

    return (
        <SidebarStepperWrapper>
            <Stepper
                orientation="vertical"
                activeStep={activeStep}
                connector={null}
                sx={{
                    '& .MuiStep-root': {
                        padding: '12px 16px',
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                            borderRadius: 1,
                        }
                    }
                }}
            >
                {steps.map((step, idx) => (
                    <Step
                        key={idx}
                        onClick={() => onStepClick && onStepClick(idx)}
                        sx={{
                            alignItems: 'flex-start',
                            padding: 0,
                            margin: 0
                        }}
                        tabIndex={0}
                    >
                        <StepLabel
                            icon={
                                <CustomAvatar
                                    variant="rounded"
                                    skin={activeStep === idx ? 'filled' : 'light'}
                                    color={activeStep >= idx ? 'primary' : 'secondary'}
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        mr: 2,
                                        fontSize: '1.1rem',
                                        boxShadow: activeStep === idx
                                            ? `0 2px 6px 0 ${hexToRGBA(theme.palette.primary.main, 0.3)}`
                                            : 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {step.icon}
                                </CustomAvatar>
                            }
                            sx={{
                                cursor: 'pointer', // <--- Key addition here!
                                '& .MuiStepLabel-label': {
                                    textAlign: 'left',
                                    cursor: 'pointer' // <--- And here
                                },
                                '& .MuiTypography-root': {
                                    cursor: 'pointer' // Also ensures pointer on Typography title/subtitle
                                }
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: activeStep === idx ? 700 : 500,
                                        fontSize: '1rem',
                                        color: activeStep === idx
                                            ? theme.palette.primary.main
                                            : theme.palette.text.primary,
                                        lineHeight: 1.4,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {step.title || step.label}
                                </Typography>
                                {step.subtitle && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: '0.875rem',
                                            lineHeight: 1.3,
                                            mt: 0.5,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {step.subtitle}
                                    </Typography>
                                )}
                            </Box>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

        </SidebarStepperWrapper>
    );
};

export default SidebarStepper;