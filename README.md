.env 作成
.env に商品 ID と見たい価格、目標金額を入れる

```terminal
$ yarn install
$ yarn build
$ yarn start
```

※ Amazon linux 等で動かそうとする場合、puppeteer が動かない

```terminal
$ cd node_modules/puppeteer/
$ cd .local-chromium/linux-737027/chrome-linux/ # linux-xxxxxは環境によって異なるので自身のものを入れる
$ ldd chrome | grep not # 足りていないものが出てくる

$ yum install libpng12 pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y

$ ldd chrome | grep not
# 何も出なければOK
```

- デーモン化して実行される(forever が入っているため)

```terminal
$ yarn start .
```
