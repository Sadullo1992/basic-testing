import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 500;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(200);
    const balance = bankAccount.getBalance();
    expect(() => bankAccount.withdraw(300)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(200);
    const balance = bankAccount.getBalance();
    const transferredAccount = getBankAccount(100);
    expect(() => bankAccount.transfer(300, transferredAccount)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(350);
    expect(() => bankAccount.transfer(200, bankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(250);
    bankAccount.deposit(200);
    expect(bankAccount.getBalance()).toEqual(450);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(700);
    bankAccount.withdraw(300);
    expect(bankAccount.getBalance()).toEqual(400);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(800);
    const transferredAccount = getBankAccount(100);
    bankAccount.transfer(300, transferredAccount);
    expect(bankAccount.getBalance()).toEqual(500);
    expect(transferredAccount.getBalance()).toEqual(400);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(700);
    const spyFetchBalance = jest.spyOn(bankAccount, 'fetchBalance');
    spyFetchBalance.mockResolvedValue(45);
    const fetchedBalance = await bankAccount.fetchBalance();
    expect(typeof fetchedBalance).toEqual('number');
    spyFetchBalance.mockClear();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(600);
    const spyFetchBalance = jest.spyOn(bankAccount, 'fetchBalance');
    spyFetchBalance.mockResolvedValue(23);
    const fetchedBalance = await bankAccount.fetchBalance();
    expect(fetchedBalance).toEqual(23);
    spyFetchBalance.mockClear();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(600);
    const spyFetchBalance = jest.spyOn(bankAccount, 'fetchBalance');
    spyFetchBalance.mockResolvedValue(null);
    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
    spyFetchBalance.mockClear();
  });
});
