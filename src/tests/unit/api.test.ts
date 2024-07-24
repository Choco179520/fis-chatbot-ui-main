import { jest } from '@jest/globals';
import * as api from '../../app/chatbot/services/api.service';

describe('api', () => {
  describe('getAPIUrl', () => {
    it('returns the correct API URL when URL is not empty', () => {
      jest.spyOn(api, 'getBaseUrl').mockReturnValue('https://somesite.com');
      const apiUrl = api.getAPIUrl();
      expect(apiUrl).toBe('https://somesite.com/api/messages');
    });
    it('returns the correct API path when URL is empty', () => {
      jest.spyOn(api, 'getBaseUrl').mockReturnValue('');
      const apiUrl = api.getAPIUrl();
      expect(apiUrl).toBe('/api/messages');
    });
  });
  describe('checkRetrievedMessageData', () => {
    test('throws an error when data is not OK', () => {
      const mockErrorResponse = { ok: false };
      const errorResponse = () =>
        api.checkRetrievedMessageData(mockErrorResponse as Response);
      expect(errorResponse).toThrow('Unavailable to retrieve data.');
    });
    test('does not throw an error when data is OK', () => {
      const mockSuccessResponse = { ok: true };
      const successResponse = () =>
        api.checkRetrievedMessageData(mockSuccessResponse as Response);
      expect(successResponse).not.toThrow();
    });
  });
  describe('getRequestInit', () => {
    test('returns the correct RequestInit object for valid userText', () => {
      const userText = 'Hello, World!';
      const expectedRequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_message: userText }),
      };
      const result = api.getRequestInit(userText);
      expect(result).toEqual(expectedRequestInit);
    });
  });
});
