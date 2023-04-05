const AUTO_COMPLETE_MAP = {
  /**ブラウザーはこのフィールドの値を自動的に入力または選択することが許可されていません。文書やアプリケーションが独自の自動補完機能を提供していたり、セキュリティ上の理由でフィールドの値を自動的に入力しないよう要求していたりする可能性はあります。*/
  off: "off",

  /**ブラウザーが自動的に入力を補完することが許可されています。フィールドに求められているデータ型としてのガイダンスが提供されていないので、ブラウザーは独自の判断を行うかもしれません。*/
  on: "on",

  /**このフィールドは人の氏名の値が期待されています。一般的には、氏名を各部分に分割すると、多様な人の氏名を扱ったり構成したりしにくくなるため、"name"を使用したほうが推奨されます。しかし、氏名をそれぞれの部分に分割する必要があるのであれば、以下のautocompleteの値を使用することができます。*/
  name: "name",

  /**接頭辞や敬称(例:"Mr.","Ms.","Dr.","Mlle")*/
  honorificPrefix: "honorific-prefix",

  /**名(ファーストネーム)*/
  givenName: "given-name",

  /**ミドルネーム*/
  additionalName: "additional-name",

  /**苗字(ファミリーネーム、「ラスト」ネーム)*/
  familyName: "family-name",

  /**接尾辞や敬称(例:"Jr.","B.Sc.","MBASW","II")*/
  honorificSuffix: "honorific-suffix",

  /**ペンネームやハンドルネーム*/
  nickname: "nickname",

  /** メールアドレス。*/
  email: "email",

  /**ユーザー名またはアカウント名。*/
  username: "username",

  /**新しいパスワード。新しいアカウントを作成したりパスワードを変更したりした場合は、一般的な「現在のパスワードを入力してください」ではなく、「新しいパスワードを入力してください」または「パスワードの確認」欄で使用してください。これは意図せずに既存のパスワードが意図せずに入力されるのを防いだり、安全なパスワードを生成するための助けになったりします(autocomplete="new-password"による自動補完の防止も参照してください)。*/
  newPassword: "new-password",

  /**ユーザーの現在のパスワードです。*/
  currentPassword: "current-password",

  /**ユーザー自身を確認するために使われるワンタイムコードです*/
  oneTimeCode: "one-time-code",

  /**職名や組織内の肩書です(例:"上級技術ライター","社長","副部隊長")*/
  organizationTitle: "organization-title",

  /**企業または団体の名前です。*/
  organization: "organization",

  /**住所。複数行のテキストが使用でき、第2行政レベル(普通は市町村)の中で完全に住所を識別できるものですが、市町村名、郵便番号、国名は含めるべきではありません。*/
  streetAddress: "street-address",

  /**住所のそれぞれの行です。これらは"street-address"が存在しない場合のみ置くことができます。*/
  addressLine1: "address-line1",

  /** 住所のそれぞれの行です。これらは"street-address"が存在しない場合のみ置くことができます。 */
  addressLine2: "address-line2",

  /**住所のそれぞれの行です。これらは"street-address"が存在しない場合のみ置くことができます。*/
  addressLine3: "address-line3",

  /**住所が4段階まである場合のもっとも細かい行政レベルです。*/
  addressLevel4: "address-level4",

  /**少なくとも3段階の行政レベルがある住所において、3番目の行政レベルです。*/
  addressLevel3: "address-level3",

  /**少なくとも2段階の行政レベルがある住所において、2番目の行政レベルです。2つの行政レベルがある国では、これはふつう市町村や、住所のあるその他の地域を表します。*/
  addressLevel2: "address-level2",

  /**住所の一番上行政レベルです。これはふつう、住所がある都道府県です。合衆国では州になります。スイスでは、カートンになります。イギリスでは、ポストタウンになります。*/
  addressLevel1: "address-level1",

  /**国コードです。*/
  country: "country",

  /**国名です。*/
  countryName: "country-name",

  /**郵便番号です(アメリカではZIPコードです)。*/
  postalCode: "postal-code",

  /**クレジットカードなどの支払手段に表示、または関連付けられた氏名です。一般に、氏名の各部分に分割するよりも氏名のフィールドを使う方が推奨されます。*/
  ccName: "cc-name",

  /**クレジットカードなどの支払手段に指定された下の名前(ファーストネーム)です。*/
  ccGivenName: "ccGiven:Name:",

  /**クレジットカードなどの支払手段に指定された中間名(ミドルネーム)です。*/
  ccAdditionalName: "ccAdditional:Name:",

  /**クレジットカードなどの支払手段に指定された姓です。*/
  ccFamilyName: "ccFamily:Name:",

  /**クレジットカードや番号や、口座番号などの支払手段を識別するその他の番号です。*/
  ccNumber: "ccNumber:",

  /**支払手段の有効期限で、ふつうは"MM/YY"または"MM/YYYY"の形です。*/
  ccExp: "ccExp:",

  /**支払手段の有効期限の月です。*/
  ccExpMonth: "ccExp:Month:",

  /**支払手段の有効期限の年です。*/
  ccExpYear: "ccExp:Year:",

  /**支払手段のセキュリティコードです。クレジットカードでは、カードの裏に書かれた3桁の認証番号です。*/
  ccCsc: "cc-csc",

  /**支払手段の種類です。(例:"Visa"や"MasterCard")."transaction-currency"この取引で決済が行われる通貨です。*/
  ccType: "cc-type",

  /**支払を行う金額の"transaction-currency"の単位による量です。*/
  transactionAmount: "transaction-amount",

  /**優先言語で、有効なBCP47言語タグで指定されたものです。*/
  language: "language",

  /**生年月日の全体です。*/
  bday: "bday",

  /**生年月日の日の部分です。*/
  bdayDay: "bday-day",

  /**生年月日の月の部分です。*/
  bdayMonth: "bday-month",

  /**生年月日の年の部分です。*/
  bdayYear: "bday-year",

  /**性別で("Female","Fa'afafine","Male"など)、改行のない自由な形式のテキストです。*/
  sex: "sex",

  /**国番号を含む、完全な電話番号です。電話番号を書く部分に分割する必要がある場合は、各フィールドに以下の値を使用することができます。*/
  tel: "tel",

  /**国コードで、例えば"1"はアメリカ、カナダ、その他の北アメリカとカリブ海の一部です。*/
  telCountryCode: "tel-country-code",

  /**国番号以外の部分の電話番号全体で、市外局番の接頭辞(日本では0)を含みます。*/
  telNational: "tel-national",

  /**市外局番で、必要に応じて市外局番の接頭辞(日本では0)を含みます。*/
  telAreaCode: "tel-area-code",

  /**国番号や市外局番を含まない電話番号です。これはさらに、市内局番と加入者番号の2つに分割することができます。 "555-6502" という電話番号では、 "tel-local-prefix" は "555"、 "tel-local-suffix" は "6502" となります。*/
  telLocal: "tel-local",

  /**電話番号の下の内線番号です。ホテルの部屋番号や企業オフィスの内線番号などです。*/
  telExtension: "tel-extension",

  /**インスタントメッセージングプロトコルの端点、たとえば"xmpp:username@example.net"などです。*/
  impp: "impp",

  /**URLです。このフォームの他のフィールドの文脈から見て適切な、ホームページのや企業ウェブサイトのアドレスです。*/
  url: "url",

  /**このフォームの他のフィールドの文脈における人物、企業、連絡先情報を表す画像のURLです。*/
  photo: "photo",
} as const;

export type AutoCompleteKeys = keyof typeof AUTO_COMPLETE_MAP;
