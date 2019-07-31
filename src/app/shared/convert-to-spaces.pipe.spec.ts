import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';

describe('ConvertToSpacesPipe', () => {
  it('create an instance', () => {
    const pipe = new ConvertToSpacesPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display string without dash', () => {
    const pipe = new ConvertToSpacesPipe();
    expect(pipe.transform('CXZX-CZXZS', '-')).toEqual('CXZX CZXZS');
  });
});
