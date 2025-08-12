import { useState, useEffect, Fragment } from 'react'

// ** Import Custom Component
import CustomDialog from 'src/@core/Global/CustomDialog'
import CustomHeader from '../customDialogHeader/CustomHeader'
import CustomTableView from '../products/listProduct/productView/CustomTableView'
import ProgressCustomization from 'src/views/components/progress/ProgressCircularCustomization'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchViewPurchase } from 'src/store/apps/purchases/Actions/getViewPurchase'
// ** Mui
import { Box, Button, Chip, DialogContent, Divider, Grid, Menu, MenuItem, Typography, FormControl, TextField,Table, TableBody, TableCell, TableRow, CardContent, InputLabel} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { getCookie } from 'cookies-next'

const LinkStyled = styled(Box)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))
const StyledTableCell = styled(TableCell)(({ theme, border }) => ({
  borderBottom: 'none',
  borderTop: border ? `1px solid ${theme.palette.divider}` : 'none'
}))

const ProductName = ({ params }) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)

  const rowOptionsOpen = anchorEl
  // ** Cookie
  const transText = getCookie('fontStyle')

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Box>
      <LinkStyled href={``}>{params.product_name}</LinkStyled>
      <Fragment>
        <Button variant='outlined' size='small' onClick={handleRowOptionsClick}>
          Actions
        </Button>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          sx={{ textTransform: transText }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='eva:person-fill' color='primary' width={16} height={16} />
            View
          </MenuItem>

          {/* {edit} */}
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='bx:pencil' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            {/* history icon */}
            <Icon icon='solar:history-bold' fontSize={20} />
            Product History
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='bx:bx-bar-chart-alt-2' fontSize={20} />
            View Stock
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRowOptionsClose()
            }}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='bx:bx-transfer' fontSize={20} />
            Should Receive
          </MenuItem>
        </Menu>
      </Fragment>
    </Box>
  )
}

const ViewPurchases = ({ toggle, open, id }) => {
  const [data, setData] = useState()

  // ** Cookie
  const transText = getCookie('fontStyle')
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')

  // ** Store Vars
  const store = useSelector(state => state.getViewPurchase?.data?.value)

  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()

  // ** Get data on mount
  useEffect(() => {
    dispatch(fetchViewPurchase({ id }))
  }, [dispatch, id])

  // ** set data
  useEffect(() => {
    if (store) {
      setData(store)
    }
  }, [store])

  console.log('data from view Purchase :>> ', data)

  const dataNames = [
    { headerName: ' Contact Name', field: 'contact_name' },
    { headerName: 'Business Number', field: 'business_number' },
    { headerName: 'Bill Status', field: 'bill_status' },
    { headerName: 'Contact Address', field: 'contact_address' },
    { headerName: 'Business Name', field: 'business_name' },
    { headerName: 'Bill Payment Status', field: 'bill_payment_status' },
    { headerName: 'Contact Mobile', field: 'contact_mobile' },
    { headerName: 'Business Landmark', field: 'business_landmark' },
    { headerName: 'Bill Store Name', field: 'bill_store_name' },
    { headerName: 'Contact Tax', field: 'contact_tax' },
    { headerName: 'Business City', field: 'business_city' },
    { headerName: 'Bill Main Currency Symbol', field: 'bill__main_currency_symbol' },
    { headerName: '', field: '' },
    { headerName: 'Business State', field: 'business_state' },
    { headerName: 'Bill Currency Symbol', field: 'bill_currency_symbol' },
    { headerName: '', field: '' },
    { headerName: '', field: '' },
    { headerName: 'Currency Exchange', field: 'currency_exchange' }
  ]

  return (
    <CustomDialog toggle={toggle} open={open}>
      {data ? (
        <Fragment>
          <CustomHeader title={`View Purchase `} handleClose={toggle} divider={false} />
          <DialogContent sx={{ padding: '0 !important' }}>
            <Divider sx={{ mb: 2 }}>
              <Chip
                label='Purchase Information'
                color='primary'
                variant='outlined'
                sx={{
                  '& .MuiChip-label': { textTransform: transText }
                }}
              />
            </Divider>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 3 }}>

              <Typography variant='h6' sx={{ fontWeight: 400, textTransform: transText }}>
               Purchase(Ref No: {data.sectionOne.bill_reference})
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 3 }}>

              <Typography variant='body1' sx={{ fontWeight: 300, textTransform: transText }}>
                date: {new Date(data.sectionOne.bill_date).toLocaleDateString()}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }}/>
              
          
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid
                item
                xs={12}
                // add glass effect
                // For Light Theme
                sx={{
                  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#191919', // Light background
                  borderRadius: '16px',
                  backdropFilter: 'blur(6.3px)',
                  WebkitBackdropFilter: 'blur(6.3px)', // Ensuring compatibility with Webkit browsers
                   // Adjusted for lighter theme
                  textTransform: transText
                }}
              >
                <Grid container spacing={2} sx={{width:'95%',margin:'auto'}} >
                  {data &&
                    data?.sectionOne &&
                    dataNames.map((obj, index) => {
                      return (
                        <Grid item xs={12} lg={4} md={4} sm={12} key={index}>
                          <Box
                            sx={{
                              display: 'flex',
                              mb: 4,
                              gap: 2,
                              flexDirection: 'row',
                              textTransform: transText
                            }}
                          >
                            <Typography
                              sx={{ ml: 3, fontWeight: 500, color: 'text.secondary', textTransform: transText }}
                            >
                              {obj.headerName!==''?`${obj.headerName}:`:''}
                             
                              {data.sectionOne[obj.field] ? (
                                <Chip
                                  label={data.sectionOne[obj.field] || ''}
                                  size={'small'}
                                  sx={{
                                    '& .MuiChip-label': { textTransform: transText },
                                    wordWrap: 'break-word'
                                  }}
                                />
                              ) : null}
                            </Typography>
                          </Box>
                        </Grid>
                      )
                    })}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }}/>
                <CustomTableView
                  dataRows={data.sectionTwo.rows}
                  dataColumns={[
                    {
                      field: 'product_name',
                      headerName: 'Product Name',
                      align: 'left',
                      minWidth: 200,
                      flex: 1,
                      renderCell: params => <ProductName params={params} />
                    },
                    {
                      field: 'product_code',
                      headerName: 'Product Code',
                      align: 'left',
                      minWidth: 120,
                      flex: 1
                    },
                    {
                      field: 'quantity',
                      headerName: 'Quantity',
                      align: 'left',
                      minWidth: 100,
                      flex: 0.8
                    },
                    {
                      field: 'unit_price_before_dis_exc_vat',
                      headerName: 'Unit Price Before Discount (Excl. VAT)',
                      align: 'left',
                      minWidth: 180,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.unit_price_before_dis_exc_vat).toFixed(decimalFormat)} ${currency_code} `
                              : `${currency_code} ${Number(params.unit_price_before_dis_exc_vat).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                    },
                    {
                      field: 'unit_price_before_dis_inc_vat',
                      headerName: 'Unit Price Before Discount (Incl. VAT)',
                      align: 'left',
                      minWidth: 180,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.unit_price_before_dis_inc_vat).toFixed(decimalFormat)} ${currency_code} `
                              : `${currency_code} ${Number(params.unit_price_before_dis_inc_vat).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                    },
                    {
                      field: 'unit_price_before_dis_exc_vat_currency',
                      headerName: 'Unit Price Before Discount (Excl. VAT) - Currency',
                      align: 'left',
                      minWidth: 200,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.unit_price_before_dis_exc_vat_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol} `
                              : `${data?.sectionOne?.bill_currency_symbol} ${Number(params.unit_price_before_dis_exc_vat_currency).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                    },
                    {
                      field: 'unit_price_before_dis_inc_vat_currency',
                      headerName: 'Unit Price Before Discount (Incl. VAT) - Currency',
                      align: 'left',
                      minWidth: 200,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.unit_price_before_dis_inc_vat_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol} `
                              : `${data?.sectionOne?.bill_currency_symbol} ${Number(params.unit_price_before_dis_inc_vat_currency).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                    },
                    {
                      field: 'discount',
                      headerName: 'Discount',
                      align: 'left',
                      minWidth: 120,
                      flex: 0.8,
                      
                    },
                    {
                      field: 'unit_price_after_dis_exc_vat',
                      headerName: 'Unit Price After Discount (Excl. VAT)',
                      align: 'left',
                      minWidth: 180,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.unit_price_after_dis_exc_vat).toFixed(decimalFormat)} ${currency_code} `
                              : `${currency_code} ${Number(params.unit_price_after_dis_exc_vat).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                      
                    },
                    {
                      field: 'unit_price_after_dis_inc_vat',
                      headerName: 'Unit Price After Discount (Incl. VAT)',
                      align: 'left',
                      minWidth: 180,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.unit_price_after_dis_inc_vat).toFixed(decimalFormat)} ${currency_code} `
                              : `${currency_code} ${Number(params.unit_price_after_dis_inc_vat).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                    },
                    {
                      field: 'unit_price_after_dis_exc_vat_currency',
                      headerName: 'Unit Price After Discount (Excl. VAT) - Currency',
                      align: 'left',
                      minWidth: 200,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.unit_price_after_dis_exc_vat_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol} `
                              : `${data?.sectionOne?.bill_currency_symbol} ${Number(params.unit_price_after_dis_exc_vat_currency).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                    },
                    {
                      field: 'unit_price_after_dis_inc_vat_currency',
                      headerName: 'Unit Price After Discount (Incl. VAT) - Currency',
                      align: 'left',
                      minWidth: 200,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.unit_price_after_dis_inc_vat_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol} `
                              : `${data?.sectionOne?.bill_currency_symbol} ${Number(params.unit_price_after_dis_inc_vat_currency).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                    },
                    {
                      field: 'subtotal_before_tax',
                      headerName: 'Subtotal Before Tax',
                      align: 'left',
                      minWidth: 180,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.subtotal_before_tax).toFixed(decimalFormat)} ${currency_code} `
                              : `${currency_code} ${Number(params.subtotal_before_tax).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                    },
                    {
                      field: 'tax',
                      headerName: 'Tax',
                      align: 'left',
                      minWidth: 100,
                      flex: 0.8
                    },
                    {
                      field: 'subtotal_after_tax',
                      headerName: 'Subtotal After Tax',
                      align: 'left',
                      minWidth: 180,
                      flex: 1,
                      renderCell: params => (
                        <Typography variant='body2' color='textSecondary'>
                          { CurrencySymbolPlacement === 'after'
                              ? `${Number(params.subtotal_after_tax).toFixed(decimalFormat)} ${currency_code} `
                              : `${currency_code} ${Number(params.subtotal_after_tax).toFixed(decimalFormat)} `
                            }
                        </Typography>
                      )
                    },
                    {
                      field: 'mfg_date',
                      headerName: 'Manufacturing Date',
                      align: 'left',
                      minWidth: 140,
                      flex: 1
                    },
                    {
                      field: 'exp_date',
                      headerName: 'Expiration Date',
                      align: 'left',
                      minWidth: 140,
                      flex: 1,
                      renderCell: params => <span>{new Date(params.exp_date).toLocaleDateString()}</span>
                    }
                  ]}
                />
                <Divider sx={{ mt: 4 }}/>
              </Grid>
              
              <Grid item xs={12}  sx={{ display: 'flex' }}> 
                    
                    <Grid item xs={6}>
                      <CustomTableView
                        dataRows={data.sectionTwo.row_shipping}
                        dataColumns={[
                          {
                            field: 'contact_name',
                            headerName: 'Name',
                            align: 'left',
                            minWidth: 150,
                            flex: 1
                          },
                          {
                            field: 'amount',
                            headerName: 'Amount',
                            align: 'left',
                            minWidth: 150,
                            flex: 1,
                            renderCell: params => (
                              <Typography variant='body2' color='textSecondary'>
                                { CurrencySymbolPlacement === 'after'
                                    ? `${Number(params.amount).toFixed(decimalFormat)} ${currency_code} `
                                    : `${currency_code} ${Number(params.amount).toFixed(decimalFormat)} `
                                  }
                              </Typography>
                            )
                          },
                          {
                            field: 'vat',
                            headerName: 'Vat',
                            align: 'left',
                            minWidth: 150,
                            flex: 1,
                            renderCell: params => (
                              <Typography variant='body2' color='textSecondary'>
                                { CurrencySymbolPlacement === 'after'
                                    ? `${Number(params.vat).toFixed(decimalFormat)} ${currency_code} `
                                    : `${currency_code} ${Number(params.vat).toFixed(decimalFormat)} `
                                  }
                              </Typography>
                            )
                          },
                          {
                            field: 'total',
                            headerName: 'Total',
                            align: 'left',
                            minWidth: 200,
                            flex: 1,
                            renderCell: params => (
                              <Typography variant='body2' color='textSecondary'>
                                { CurrencySymbolPlacement === 'after'
                                    ? `${Number(params.total).toFixed(decimalFormat)} ${currency_code} `
                                    : `${currency_code} ${Number(params.total).toFixed(decimalFormat)} `
                                  }
                              </Typography>
                            )
                          },
                          {
                            field: 'amount_currency',
                            headerName: 'Amount Currency',
                            align: 'left',
                            minWidth: 180,
                            flex: 1,
                            renderCell: params => (
                              <Typography variant='body2' color='textSecondary'>
                                { CurrencySymbolPlacement === 'after'
                                    ? `${Number(params.amount_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol} `
                                    : `${data?.sectionOne?.bill_currency_symbol} ${Number(params.amount_currency).toFixed(decimalFormat)} `
                                  }
                              </Typography>
                            )

                          }
                          ,
                          {
                            field: 'vat_currency',
                            headerName: 'Vat Currency',
                            align: 'left',
                            minWidth: 180,
                            flex: 1,
                            renderCell: params => (
                              <Typography variant='body2' color='textSecondary'>
                                { CurrencySymbolPlacement === 'after'
                                    ? `${Number(params.vat_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol} `
                                    : `${data?.sectionOne?.bill_currency_symbol} ${Number(params.vat_currency).toFixed(decimalFormat)} `
                                  }
                              </Typography>
                            )
                          },
                          {
                            field: 'total_currency',
                            headerName: 'Total Currency',
                            align: 'left',
                            minWidth: 180,
                            flex: 1,
                            renderCell: params => (
                              <Typography variant='body2' color='textSecondary'>
                                { CurrencySymbolPlacement === 'after'
                                    ? `${Number(params.total_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol} `
                                    : `${data?.sectionOne?.bill_currency_symbol} ${Number(params.total_currency).toFixed(decimalFormat)} `
                                  }
                              </Typography>
                            )
                          },
                          {
                            field: 'cost_center',
                            headerName: 'Cost Center',
                            align: 'left',
                            minWidth: 180,
                            flex: 1
                          },
                          {
                            field: 'text',
                            headerName: 'Note',
                            align: 'left',
                            minWidth: 180,
                            flex: 1
                          },
                          {
                            field: 'date',
                            headerName: 'Date',
                            align: 'left',
                            minWidth: 180,
                            flex: 1
                          },
                          
                        ]}
                      />
                      <Grid container spacing={3} pt={5}>
                        <Grid item xs={12} md={4} lg={4}>
                          <FormControl fullWidth>
                            <TextField
                              label='Total Amount'
                              value= { CurrencySymbolPlacement === 'after'
                                ? `${Number(data.sectionTwo.total_shipping.total_amount).toFixed(decimalFormat)} ${currency_code} `
                                : `${currency_code} ${Number(data.sectionTwo.total_shipping.total_amount).toFixed(decimalFormat)} `
                              }
                              disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                          <FormControl fullWidth>
                            <TextField
                              label='Total Vat'
                              value= { CurrencySymbolPlacement === 'after'
                                ? `${Number(data.sectionTwo.total_shipping.total_vat).toFixed(decimalFormat)} ${currency_code} `
                                : `${currency_code} ${Number(data.sectionTwo.total_shipping.total_vat).toFixed(decimalFormat)} `
                              }
                              disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                          <FormControl fullWidth>
                            <TextField
                            label='Total'
                            value= { CurrencySymbolPlacement === 'after'
                              ? `${Number(data.sectionTwo.total_shipping.total).toFixed(decimalFormat)} ${currency_code} `
                              : `${currency_code} ${Number(data.sectionTwo.total_shipping.total).toFixed(decimalFormat)} `
                            }
                            disabled />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                      <Grid item xs={6} sm={6} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                        <Box sx={{ width: '100%', mb: 4 }}>
                          <Table>
                            <TableBody>
                              {/* Subtotal */}
                              <TableRow>
                                <StyledTableCell>
                                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                                    Subtotal:
                                  </Typography>
                                </StyledTableCell>
                                <StyledTableCell align='center'>
                                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                    {CurrencySymbolPlacement === 'before'
                                      ? `${currency_code} ${Number(data.sectionTwo.bill_info.subtotal).toFixed(decimalFormat)}`
                                      : `${Number(data.sectionTwo.bill_info.subtotal).toFixed(decimalFormat)} ${currency_code}`}
                                  </Typography>
                                </StyledTableCell>
                                {data.sectionTwo.bill_info.subtotal_currency && (
                                  <StyledTableCell align='center'>
                                    <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                    {CurrencySymbolPlacement === 'before'
                                      ? `${data?.sectionOne?.bill_currency_symbol} ${Number(data.sectionTwo.bill_info.subtotal_currency).toFixed(decimalFormat)}`
                                      : `${Number(data.sectionTwo.bill_info.subtotal_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol}`}
                                    </Typography>
                                  </StyledTableCell>
                                )}
                              </TableRow>

                              {/* Discount */}
                              <TableRow>
                                <StyledTableCell>
                                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                                    Discount:
                                  </Typography>
                                </StyledTableCell>
                                <StyledTableCell align='center'>
                                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                    {CurrencySymbolPlacement === 'before'
                                      ? `${currency_code} ${Number(data.sectionTwo.bill_info.discount).toFixed(decimalFormat)}`
                                      : `${Number(data.sectionTwo.bill_info.discount).toFixed(decimalFormat)} ${currency_code}`}
                                  </Typography>
                                </StyledTableCell>
                                {data.sectionTwo.bill_info.discount_currency && (
                                  <StyledTableCell align='center'>
                                    <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                    {CurrencySymbolPlacement === 'before'
                                      ? `${data?.sectionOne?.bill_currency_symbol} ${Number(data.sectionTwo.bill_info.discount_currency).toFixed(decimalFormat)}`
                                      : `${Number(data.sectionTwo.bill_info.discount_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol}`}
                                    </Typography>
                                  </StyledTableCell>
                                )}
                              </TableRow>

                              {/* Vat */}
                              <TableRow>
                                <StyledTableCell>
                                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                                    Vat:
                                  </Typography>
                                </StyledTableCell>
                                <StyledTableCell align='center'>
                                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                    {CurrencySymbolPlacement === 'before'
                                      ? `${currency_code} ${Number(data.sectionTwo.bill_info.vat).toFixed(decimalFormat)}`
                                      : `${Number(data.sectionTwo.bill_info.vat).toFixed(decimalFormat)} ${currency_code}`}
                                  </Typography>
                                </StyledTableCell>
                                {data.sectionTwo.bill_info.vat_currency && (
                                  <StyledTableCell align='center'>
                                    <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                    {CurrencySymbolPlacement === 'before'
                                      ? `${data?.sectionOne?.bill_currency_symbol} ${Number(data.sectionTwo.bill_info.vat_currency).toFixed(decimalFormat)}`
                                      : `${Number(data.sectionTwo.bill_info.vat_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol}`}
                                    </Typography>
                                  </StyledTableCell>
                                )}
                              </TableRow>
                              <TableRow>
                                <StyledTableCell border>
                                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                                    Total:
                                  </Typography>
                                </StyledTableCell>
                                <StyledTableCell align='center' border>
                                  <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                    {CurrencySymbolPlacement === 'before'
                                      ? `${currency_code} ${Number(data.sectionTwo.bill_info.final_total).toFixed(decimalFormat)}`
                                      : `${Number(data.sectionTwo.bill_info.final_total).toFixed(decimalFormat)} ${currency_code}`}
                                  </Typography>
                                </StyledTableCell>
                                {data.sectionTwo.bill_info.vat_currency && (
                                  <StyledTableCell align='center' border>
                                    <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                    {CurrencySymbolPlacement === 'before'
                                      ? `${data?.sectionOne?.bill_currency_symbol} ${Number(data.sectionTwo.bill_info.final_total_currency).toFixed(decimalFormat)}`
                                      : `${Number(data.sectionTwo.bill_info.final_total_currency).toFixed(decimalFormat)} ${data?.sectionOne?.bill_currency_symbol}`}
                                    </Typography>
                                  </StyledTableCell>
                                )}
                              </TableRow>
                              


                                  

                            </TableBody>
                          </Table>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex' }} >
                  <Grid item xs={6}>
                  <CardContent >
                      <InputLabel
                        htmlFor='invoice-note'
                        sx={{
                          mb: 2,
                          fontSize: '.75rem',
                          fontWeight: 600,
                          color: 'text.primary',
                          textTransform: 'uppercase'
                        }}
                      >
                        Shipping Details:
                      </InputLabel>
                      <TextField
                        rows={2}
                        fullWidth
                        multiline
                        name='shipping_details'
                        value={data.sectionTwo.shipping_details?data.sectionTwo.shipping_details:''}
                        id='invoice-note'
                        placeholder='No Shipping Details !'
                        disabled
                      />
                    </CardContent>
                    </Grid>
                  <Grid item xs={6}>
                   <CardContent >
                      <InputLabel
                        htmlFor='invoice-note'
                        sx={{
                          mb: 2,
                          fontSize: '.75rem',
                          fontWeight: 600,
                          color: 'text.primary',
                          textTransform: 'uppercase'
                        }}
                      >
                        Additional Shipping Note:
                      </InputLabel>
                      <TextField
                        rows={2}
                        fullWidth
                        multiline
                        name='additional_shipping_note'
                        value={data.sectionTwo.additional_shipping_note?data.sectionTwo.additional_shipping_note:''}
                        id='invoice-note'
                        placeholder='No  Additional Shipping Notes !'
                        disabled
                      />
                    </CardContent>
                    </Grid>
                </Grid>
              
              
  
    
              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }}>
                  <Chip
                    label='Payment Info'
                    color='primary'
                    variant='outlined'
                    sx={{
                      '& .MuiChip-label': { textTransform: transText }
                    }}
                  />
                </Divider>

                <CustomTableView
                  dataRows={data.sectionThree}
                  dataColumns={[
                    {
                      field: 'amount',
                      headerName: 'Amount',
                      align: 'left',
                      minWidth: 150,
                      flex: 1
                    },
                    {
                      field: 'date',
                      headerName: 'Date',
                      align: 'left',
                      minWidth: 150,
                      flex: 1,
                      renderCell: params => <span>{new Date(params.date).toLocaleDateString()}</span>
                    },
                    {
                      field: 'payment_mode',
                      headerName: 'Payment Mode',
                      align: 'left',
                      minWidth: 150,
                      flex: 1
                    },
                    {
                      field: 'payment_note',
                      headerName: 'Payment Note',
                      align: 'left',
                      minWidth: 200,
                      flex: 1,
                      renderCell: params => <span>{params.payment_note || 'N/A'}</span>
                    },
                    {
                      field: 'reference_no',
                      headerName: 'Reference Number',
                      align: 'left',
                      minWidth: 180,
                      flex: 1
                    }
                  ]}
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 3,
                    m: 3
                  }}
                >
                  <Button variant='contained' sx={{ m: 3 }} color='primary'>
                    Entry
                  </Button>
                  <Button variant='outlined' sx={{ m: 3 }} color='primary'>
                    Edit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Fragment>
      ) : (
        <Grid>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <Box>
              <ProgressCustomization />
            </Box>
          </Box>
        </Grid>
      )}
    </CustomDialog>
  )
}

export default ViewPurchases
