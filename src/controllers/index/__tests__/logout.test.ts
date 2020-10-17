import request from 'supertest';
import { app } from '../../../app';

describe('Logout Route Handler Test Suite', () => {
  it('Should return 200 for successful logout', async () => {
    await request(app)
      .get('/logout')
      .set('Cookie', await global.signup())
      .send()
      .expect(200);
  });

  it('Should return 400 for not authorized logout requests', async () => {
    await request(app)
      .get('/logout')
      .set('Cookie', 'notavalidcookie')
      .send()
      .expect(401);
  });
});
