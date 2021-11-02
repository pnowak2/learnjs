def calc_dividend(monthlyAmount, profitRatio = 0.5, years = 1):
    ''' 
        monthly amount: how much monthly in eur to put on profit
        profitRation: rate how much of profit goes to dividend each 3 months
    '''
    profit = 0
    dividend = 0
    totalProfit = 0
    totalDividend = 0

    for _ in range(years * 4):
        profit = profit + (3 * monthlyAmount)
        dividend = profitRatio * profit
        profit = profit - dividend
        totalProfit += profit
        totalDividend += dividend

    return  {
        'profit': totalProfit,
        'dividend': totalDividend
    }

result = calc_dividend(650)

print(f'Annuald dividend: {result.get("dividend")}')
print(f'Profit left on company: {result.get("profit")}')