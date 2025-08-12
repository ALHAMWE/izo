import { Fragment, useEffect, useState } from 'react'
// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchEntryPurchase } from 'src/store/apps/purchases/Actions/getEntryPurchase'

// ** MUI
import { Grid, Typography, Chip, Divider, Dialog, DialogContent } from '@mui/material'

// ** custom components
import CustomHeader from 'src/@core/components/customDialogHeader/CustomHeader'
import CustomTableView from '../../products/listProduct/productView/CustomTableView'
import ListLoading from 'src/@core/Global/ListLoading'

// ** cookies
import { getCookie } from 'cookies-next'

const PurchaseEntry = ({ open, toggle, id }) => {
  const [entryData, setEntryData] = useState(null) // Initially setting data as null

  // ** cookies
  const decimalFormat = getCookie('DecimalFormat')
  const currency_code = getCookie('currency_code')
  const CurrencySymbolPlacement = getCookie('CurrencySymbolPlacement')
  const fontStyling = getCookie('fontStyle')

  const handleClose = () => {
    toggle()
  }

  const dispatch = useDispatch()

  // Fetch data when id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchEntryPurchase({ id }))
    }
  }, [id, dispatch])

  // Update data when fetchData changes
  const fetchData = useSelector(state => state.getEntryPurchase?.data?.value)

  useEffect(() => {
    if (fetchData) setEntryData(fetchData)
  }, [fetchData])

  return (
    <Fragment>
      <Dialog
        open={open}
        maxWidth='lg'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        sx={{ height: '100%' }}
      >
        <Fragment>
          <CustomHeader
            title={`Entry ( Ref No: ${entryData?.source_reference ? entryData?.source_reference : ''})`}
            handleClose={handleClose}
            divider={false}
          />

          <DialogContent sx={{ padding: '0 !important' }}>
            <Grid container spacing={2} sx={{ p: 3 }}>
              {entryData && (
                <Grid item xs={12}>
                  <Divider sx={{ mb: 2 }}>
                    <Chip
                      sx={{
                        '& .MuiChip-label': { textTransform: fontStyling }
                      }}
                      label={`Entry Information`}
                      color='primary'
                      variant='outlined'
                    />
                  </Divider>

                  {entryData?.entries &&
                    entryData.entries.length > 0 &&
                    entryData.entries.map((table, index) => {
                      return (
                        <Fragment key={index}>
                          <Divider sx={{ mb: 2 }}>
                            <Chip
                              sx={{
                                '& .MuiChip-label': { textTransform: fontStyling },
                                mt: 3
                              }}
                              label={`${table?.entry_reference}`}
                              color='primary'
                              variant='outlined'
                            />
                          </Divider>
                          <CustomTableView
                            dataRows={table?.allData}
                            dataColumns={[
                              {
                                field: 'account_id',
                                headerName: 'Account',
                                align: 'left',
                                minWidth: 200
                              },
                              {
                                field: 'operation_date',
                                headerName: 'Date',
                                align: 'left'
                              },
                              {
                                field: 'debit',
                                headerName: 'Debit',
                                align: 'left',
                                renderCell: params => (
                                  <Typography variant='body2' color='textSecondary'>
                                    {params.type === 'debit'
                                      ? CurrencySymbolPlacement === 'after'
                                        ? `${Number(params.amount).toFixed(decimalFormat)} ${currency_code} `
                                        : `${currency_code} ${Number(params.amount).toFixed(decimalFormat)} `
                                      : ''}
                                  </Typography>
                                )
                              },
                              {
                                field: 'Credit',
                                headerName: 'Credit',
                                align: 'left',
                                renderCell: params => (
                                  <Typography variant='body2' color='textSecondary'>
                                    {params.type === 'credit'
                                      ? CurrencySymbolPlacement === 'after'
                                        ? `${Number(params.amount).toFixed(decimalFormat)} ${currency_code} `
                                        : `${currency_code} ${Number(params.amount).toFixed(decimalFormat)} `
                                      : ''}
                                  </Typography>
                                )
                              },
                              {
                                field: 'cost_center',
                                headerName: 'Cost Center',
                                align: 'left',
                                renderCell: params => (
                                  <Typography variant='body2' color='textSecondary'>
                                    {params.cost_center ? params.cost_center : ''}
                                  </Typography>
                                )
                              }
                            ]}
                            totalDebit={[
                              {
                                field: '',
                                headerName: '',
                                align: 'left',
                                minWidth: 200
                              },
                              {
                                field: '',
                                headerName: '',
                                align: 'left'
                              },
                              {
                                field: '',
                                align: 'left',
                                headerName: `${
                                    CurrencySymbolPlacement === 'after'
                                      ? `${Number(table.balance.total_debit).toFixed(decimalFormat)} ${currency_code} `
                                      : `${currency_code} ${Number(table.balance.total_debit).toFixed(decimalFormat)} `
                                }`
                              },
                              {
                                field: '',
                                headerName: `${
                                    CurrencySymbolPlacement === 'after'
                                      ? `${Number(table.balance.total_debit).toFixed(decimalFormat)} ${currency_code} `
                                      : `${currency_code} ${Number(table.balance.total_debit).toFixed(decimalFormat)} `
                                 }`,
                                align: 'left'
                              },
                              {
                                field: '',
                                headerName: '',
                                align: 'left'
                              }
                            ]}
                          />
                        </Fragment>
                      )
                    })}
                </Grid>
              )}
              {!entryData?.entries?.length > 0 && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    alignContent: 'center'
                  }}
                >
                  <ListLoading />
                </Grid>
              )}
            </Grid>
          </DialogContent>
        </Fragment>
      </Dialog>
    </Fragment>
  )
}

export default PurchaseEntry
