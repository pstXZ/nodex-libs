import { decompress, decode, escape } from "../src/html";

test("test decompress function", () => {
  let res = {
    status: 200,
    headers: {
      "Content-Encoding": "gzip"
    },
    content: "../../test.gz"
  }
  async function dec(res) {
    let response = await decompress(res);
    return response;
  }
  let a = dec(res);
  a.then(res => {
    expect(res.content).toBe("text.txt")
  })

  let res2 = {
    status: 200,
    headers: {
      "Content-Encoding": "zip"
    },
    content: "../../nodex-abs-port.zip"
  }
  async function dec2(res2) {
    let response = await decompress(res2);
    expect(response.content).toBe("../../nodex-abs-port.zip");
  }
  dec2(res2);

});

test("test decode function", () => {
  let res = {
    status: 200,
    headers: {
      "content-type": "text/plain,charset=utf-8"
    },
    content: "test"
  }

  async function dec(res) {
    let a  = await decode(res);
    return a;
  }

  let b = dec(res);
  b.then(
    res => {
      expect(res.content).toBe("test");
    }
  );

  let res2 = {
    status: 200,
    headers: {
      "content-type": "text/plain,charset="
    },
    content: "test"
  }

  async function dec2(res) {
    let a2  = await decode(res);
    return a2;
  }

  let b2 = dec2(res2);
  b2.then(
    res => {
      expect(res.content).toBe("test");
    }
  );

})

test("test escape function", () => {
  let result = escape("&");
  result.then(
    res => {
      expect(res.toString()).toBe("&amp;");
    }
  )

  let result2 = escape("<");
  result2.then(
    res => {
      expect(res.toString()).toBe("&lt;");
    }
  )
})