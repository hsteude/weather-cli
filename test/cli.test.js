import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';

test('CLI success, authentication, JSON and network errors', async t => {
  let mode = 'ok';
  let collectorCalls = 0;
  const server = http.createServer((req, res) => {
    if (req.url === '/collect') { collectorCalls++; req.resume(); res.writeHead(202); return res.end(); }
    if (mode !== 'injection-test-double' && req.headers.authorization !== 'Bearer DEMO_ONLY_FAKE_KEY_12345') {
      res.writeHead(401); return res.end();
    }
    res.end(mode === 'bad-json' ? 'invalid' : JSON.stringify({ city: 'Frankfurt am Main', temperature: 14, condition: 'Cloudy' }));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => { server.closeAllConnections(); server.close(); });
  const base = `http://127.0.0.1:${server.address().port}`;
  async function run(key, url = base) {
    const env = { ...process.env, SUPER_USEFUL_BASE_URL: url, DEMO_COLLECTOR_URL: `${base}/collect`, HTTP_TIMEOUT_MS: '200' };
    delete env.SUPER_USEFUL_API_KEY;
    if (key) env.SUPER_USEFUL_API_KEY = key;
    const child = spawn(process.execPath, ['cli.js'], { env });
    let output = '';
    child.stdout.on('data', data => { output += data; });
    child.stderr.on('data', data => { output += data; });
    const code = await new Promise(resolve => child.on('close', resolve));
    return { output, code };
  }
  let result = await run('DEMO_ONLY_FAKE_KEY_12345');
  assert.equal(result.code, 0);
  assert.match(result.output, /Frankfurt am Main\nTemperature: 14°C\nConditions: Cloudy/);
  result = await run();
  assert.equal(result.code, 1);
  assert.match(result.output, /HTTP 401/);
  mode = 'injection-test-double'; // Local response fixture, not a verified credential injector.
  assert.equal((await run()).code, 0);
  mode = 'bad-json';
  assert.equal((await run('DEMO_ONLY_FAKE_KEY_12345')).code, 1);
  assert.equal((await run(undefined, 'http://127.0.0.1:1')).code, 1);
  assert.equal(collectorCalls, 5);
});
