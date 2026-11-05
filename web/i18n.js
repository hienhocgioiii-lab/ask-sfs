/* Ask SFS help center translations: English, Vietnamese, Spanish, Simplified Chinese.
   Chosen from research: Spanish and Chinese are Philadelphia's most-spoken languages after English (U.S. Census ACS),
   China is Temple's largest international group, and Vietnamese is in Philadelphia's top five and among Temple's international students. */
const LANGS = {en:"English", vi:"Tiếng Việt", es:"Español", zh:"中文"};

const UI = {
  en:{nav:["Topics","Key dates","Contact","Open the app"], h1:"How can we help with paying for Temple?", lede:"Ask in your own words. Answers come from official SFS and Bursar policy, with the source.",
    ph:"e.g. My grant hasn’t shown up and my bill is due", ask:"Ask", fine:"Never type your TUid, SSN or bank numbers.", note:"",
    chatH:"Your answer", clear:"Clear", topicsH:"Browse by topic", topicsP:"Short answers to what students ask most.", datesH:"Key dates", datesP:"Spring 2027 and next year’s aid.",
    contactH:"Still need a person?", contactP:"Know which office to ask before you call.",
    c1k:"Aid, FAFSA, loans, SAP", c2k:"Bills, payment plans, refunds", c3k:"Save a trip", c3b:"Prep your case in the app", c3s:"We’ll tell you which office to contact and what to have ready, so one visit solves it.", c3l:"Open Ask SFS →",
    sfs:"Student Financial Services", bursar:"Bursar’s Office", hours:"Mon–Fri, 8:30–5",
    source:"Source", prep:"Prep my case in the app", contact:"Contact info", more:"More on", done:"Done", passed:"Passed", today:"Today", inDays:n => `In ${n} day${n === 1 ? "" : "s"}`,
    blocked:"That looks like an ID, SSN or account number, so it wasn’t sent. Please remove it and ask again.",
    foot:"Student project, not an official Temple University site. Answers are paraphrased from public SFS and Bursar pages; confirm money decisions with SFS.",
    chips:["My grant hasn’t shown up and my bill is due","When do I get my refund?","Why do I have a hold?","SFS or the Bursar, who do I ask?"],
    dates:{sapappeal:["Fall SAP appeal deadline","You’re on Financial Aid Warning? Appeals need an advisor-signed plan."],bill:["Spring bill due","Unpaid balance moves to the Deferred Payment Plan with a $50 fee."],fafsa:["2027–28 FAFSA priority deadline","Temple’s priority deadline. Filing late can mean less aid."],final:["Final spring payment date","After this: $200 late fee and a hold on registering for fall."]}},
  vi:{nav:["Chủ đề","Ngày quan trọng","Liên hệ","Mở ứng dụng"], h1:"Chúng tôi có thể giúp gì về chi phí học tại Temple?", lede:"Hãy hỏi bằng lời của bạn. Câu trả lời dựa trên chính sách chính thức của SFS và Bursar, có kèm nguồn.",
    ph:"VD: Tiền trợ cấp của tôi chưa đến mà hóa đơn sắp hết hạn", ask:"Hỏi", fine:"Đừng bao giờ nhập mã TUid, số SSN hoặc số tài khoản ngân hàng.", note:"Các trang chính sách chính thức chỉ có bằng tiếng Anh.",
    chatH:"Câu trả lời", clear:"Xóa", topicsH:"Xem theo chủ đề", topicsP:"Câu trả lời ngắn cho những câu hỏi phổ biến nhất.", datesH:"Ngày quan trọng", datesP:"Học kỳ xuân 2027 và trợ cấp năm sau.",
    contactH:"Vẫn cần gặp người thật?", contactP:"Biết nên hỏi văn phòng nào trước khi gọi.",
    c1k:"Trợ cấp, FAFSA, khoản vay, SAP", c2k:"Hóa đơn, trả góp, hoàn tiền", c3k:"Đỡ mất công", c3b:"Chuẩn bị hồ sơ trong ứng dụng", c3s:"Ứng dụng cho bạn biết nên liên hệ văn phòng nào và cần chuẩn bị gì, để chỉ cần một lần là xong.", c3l:"Mở Ask SFS →",
    sfs:"Phòng Hỗ trợ Tài chính (SFS)", bursar:"Phòng Thu ngân (Bursar)", hours:"Thứ Hai–Thứ Sáu, 8:30–5:00",
    source:"Nguồn", prep:"Chuẩn bị hồ sơ trong ứng dụng", contact:"Thông tin liên hệ", more:"Xem thêm:", done:"Xong", passed:"Đã qua", today:"Hôm nay", inDays:n => `Còn ${n} ngày`,
    blocked:"Có vẻ đó là mã số, số SSN hoặc số tài khoản nên chưa được gửi. Vui lòng xóa đi và hỏi lại.",
    foot:"Dự án của sinh viên, không phải trang chính thức của Đại học Temple. Câu trả lời được diễn giải từ các trang công khai của SFS và Bursar; hãy xác nhận các quyết định về tiền với SFS.",
    chips:["Tiền trợ cấp của tôi chưa đến mà hóa đơn sắp hết hạn","Khi nào tôi nhận được tiền hoàn lại?","Tại sao tài khoản của tôi bị khóa (hold)?","Tôi nên hỏi SFS hay Bursar?"],
    dates:{sapappeal:["Hạn chót kháng nghị SAP học kỳ thu","Bạn đang bị Cảnh báo Trợ cấp? Đơn kháng nghị cần kế hoạch có chữ ký của cố vấn."],bill:["Hạn đóng hóa đơn học kỳ xuân","Số tiền chưa trả sẽ chuyển sang Kế hoạch Trả chậm với phí $50."],fafsa:["Hạn ưu tiên FAFSA 2027–28","Hạn ưu tiên của Temple. Nộp trễ có thể nhận ít trợ cấp hơn."],final:["Hạn chót đóng tiền học kỳ xuân","Sau ngày này: phí trễ hạn $200 và bị khóa đăng ký học kỳ thu."]}},
  es:{nav:["Temas","Fechas clave","Contacto","Abrir la app"], h1:"¿Cómo podemos ayudarte a pagar Temple?", lede:"Pregunta con tus propias palabras. Las respuestas vienen de las políticas oficiales de SFS y del Bursar, con la fuente.",
    ph:"Ej.: Mi subvención no ha llegado y mi factura vence pronto", ask:"Preguntar", fine:"Nunca escribas tu TUid, SSN ni números de cuenta bancaria.", note:"Las páginas oficiales de políticas están solo en inglés.",
    chatH:"Tu respuesta", clear:"Borrar", topicsH:"Buscar por tema", topicsP:"Respuestas cortas a lo que más preguntan los estudiantes.", datesH:"Fechas clave", datesP:"Primavera 2027 y la ayuda del próximo año.",
    contactH:"¿Todavía necesitas hablar con alguien?", contactP:"Sabe a qué oficina preguntar antes de llamar.",
    c1k:"Ayuda, FAFSA, préstamos, SAP", c2k:"Facturas, planes de pago, reembolsos", c3k:"Ahórrate un viaje", c3b:"Prepara tu caso en la app", c3s:"Te decimos a qué oficina contactar y qué tener listo, para resolverlo en una sola visita.", c3l:"Abrir Ask SFS →",
    sfs:"Servicios Financieros Estudiantiles (SFS)", bursar:"Oficina del Bursar", hours:"Lun–Vie, 8:30–5",
    source:"Fuente", prep:"Prepara tu caso en la app", contact:"Contacto", more:"Más sobre:", done:"Listo", passed:"Ya pasó", today:"Hoy", inDays:n => `En ${n} día${n === 1 ? "" : "s"}`,
    blocked:"Eso parece un ID, SSN o número de cuenta, así que no se envió. Quítalo y vuelve a preguntar.",
    foot:"Proyecto estudiantil, no es un sitio oficial de Temple University. Las respuestas resumen páginas públicas de SFS y del Bursar; confirma las decisiones de dinero con SFS.",
    chips:["Mi subvención no ha llegado y mi factura vence","¿Cuándo recibo mi reembolso?","¿Por qué tengo una retención (hold)?","¿Pregunto a SFS o al Bursar?"],
    dates:{sapappeal:["Fecha límite de apelación SAP de otoño","¿Estás en Advertencia de Ayuda? La apelación necesita un plan firmado por tu asesor."],bill:["Vence la factura de primavera","El saldo sin pagar pasa al Plan de Pago Diferido con un cargo de $50."],fafsa:["Fecha prioritaria FAFSA 2027–28","Fecha prioritaria de Temple. Presentarla tarde puede significar menos ayuda."],final:["Fecha final de pago de primavera","Después: cargo de $200 y una retención para inscribirte en otoño."]}},
  zh:{nav:["主题","重要日期","联系方式","打开应用"], h1:"关于 Temple 的学费，我们能帮你什么？", lede:"用你自己的话提问。答案来自 SFS 和 Bursar 的官方政策，并附上来源。",
    ph:"例如：我的助学金还没到，账单快到期了", ask:"提问", fine:"请勿输入你的 TUid、社会安全号或银行账号。", note:"官方政策页面仅有英文版。",
    chatH:"你的答案", clear:"清除", topicsH:"按主题浏览", topicsP:"学生最常问的问题的简短解答。", datesH:"重要日期", datesP:"2027 春季学期及下一学年的资助。",
    contactH:"还需要找人帮忙？", contactP:"打电话前先确认该找哪个办公室。",
    c1k:"资助、FAFSA、贷款、SAP", c2k:"账单、分期付款、退款", c3k:"少跑一趟", c3b:"在应用中准备你的问题", c3s:"我们会告诉你该联系哪个办公室、需要准备什么，一次就能解决。", c3l:"打开 Ask SFS →",
    sfs:"学生财务服务处 (SFS)", bursar:"财务出纳处 (Bursar)", hours:"周一至周五 8:30–5:00",
    source:"来源", prep:"在应用中准备你的问题", contact:"联系方式", more:"了解更多：", done:"完成", passed:"已过", today:"今天", inDays:n => `还有 ${n} 天`,
    blocked:"这看起来像是学号、社会安全号或账号，所以没有发送。请删除后重新提问。",
    foot:"学生项目，并非 Temple University 官方网站。答案改写自 SFS 和 Bursar 的公开页面；涉及金钱的决定请向 SFS 确认。",
    chips:["我的助学金还没到，账单快到期了","我什么时候能收到退款？","为什么我的账户被冻结 (hold)？","我该问 SFS 还是 Bursar？"],
    dates:{sapappeal:["秋季 SAP 申诉截止日","你处于资助警告状态？申诉需要由学业顾问签字的计划。"],bill:["春季账单到期","未付余额将自动转入延期付款计划，并收取 $50 费用。"],fafsa:["2027–28 FAFSA 优先截止日","Temple 的优先截止日。晚交可能会拿到更少的资助。"],final:["春季最终付款日","此后：收取 $200 滞纳金，并冻结秋季选课。"]}},
};

// Topic cards and answers (paraphrased from the same public SFS facts as the English text)
const TOPIC_TR = {
  vi:{
    late:{t:"Tiền trợ cấp chưa đến",b:"Hầu hết các khoản trợ cấp được chuyển từ ngày 6/1. PA State Grant và Temple Promise chỉ được chuyển sau giai đoạn add/drop, nên hóa đơn tháng 1 còn thiếu là bình thường.",s:["Kiểm tra TUportal → Costs & Aid xem còn việc gì chưa hoàn tất","Khoản vay: hoàn tất MPN và buổi tư vấn đầu vào tại studentaid.gov","Chưa trả hết vào 21/1? Số dư chuyển sang kế hoạch trả chậm ($50). Trả trước 4/3 để không bị khóa"]},
    bill:{t:"Hóa đơn và hạn đóng",b:"Hóa đơn học kỳ xuân đến hạn ngày 21/1/2027. Nếu không trả đủ, phần còn lại tự động chuyển sang Kế hoạch Trả chậm với phí $50.",s:["Xem số dư trong TUpay","Trả phần còn lại trước ngày 4/3/2027","Trễ hạn 4/3 sẽ bị phí $200 và bị khóa tài khoản"]},
    refund:{t:"Nhận tiền hoàn lại",b:"Nếu trợ cấp nhiều hơn hóa đơn, phần dư sẽ được hoàn lại cho bạn, thường vài ngày trước khi bắt đầu học.",s:["TUportal → TUpay → Manage My Refunds","Chọn gửi trực tiếp vào tài khoản (nhanh nhất)","Không chọn thì sẽ nhận séc giấy qua bưu điện"]},
    hold:{t:"Tài khoản bị khóa (hold)",b:"Bị khóa nghĩa là khoản nợ cũ chưa được trả trước hạn chót. Việc này chặn đăng ký học, bảng điểm và bằng tốt nghiệp.",s:["Kiểm tra số tiền trong TUpay","Trợ cấp liên bang không trả được nợ của học kỳ trước","Trả nợ, hoặc hỏi về khoản vay tư nhân (gửi mẫu đơn đến sfs@temple.edu, tiêu đề “Prior Balance”)"]},
    verif:{t:"Giấy tờ xác minh",b:"Chính phủ đã chọn hồ sơ FAFSA của bạn để kiểm tra lại. Trợ cấp sẽ chưa được chuyển cho đến khi hoàn tất.",s:["Chỉ tải lên temple.studentforms.com, không gửi qua email","Thường cần bảng khai thuế, W-2 hoặc giấy tờ tùy thân","Hoàn tất trước 1/6 để giữ các khoản trợ cấp của Temple"]},
    sap:{t:"Giữ trợ cấp (SAP)",b:"Để giữ trợ cấp, bạn cần GPA ít nhất 2.0 và hoàn thành 67% số tín chỉ đã đăng ký.",s:["Không đạt lần một: cảnh báo. Lần hai: mất trợ cấp","Kháng nghị trên SFS dashboard kèm kế hoạch có chữ ký của cố vấn","Hạn kháng nghị học kỳ thu 2026: 30/11"]},
    loans:{t:"Khoản vay sinh viên",b:"Khoản vay liên bang phải được chấp nhận trên TUportal, và chỉ được chuyển sau khi hoàn tất hai bước trực tuyến.",s:["Chấp nhận trong TUportal → Costs & Aid","Ký MPN và làm buổi tư vấn đầu vào tại studentaid.gov","Học bán thời gian (6–11 tín chỉ)? Khoản vay được chuyển sau add/drop"]},
    other:{t:"Nói chuyện với người thật",b:"Gọi SFS: 215-204-2244 (Thứ Hai–Thứ Sáu, 8:30–5) hoặc email sfs@temple.edu. Lịch hẹn đặt qua QLess và kín rất nhanh gần hạn đóng tiền.",s:["Chuẩn bị họ tên và mã Temple ID (nói qua điện thoại, đừng gửi email)","Hóa đơn và hoàn tiền thuộc Bursar: 215-204-7269","Chuẩn bị hồ sơ trước để chỉ cần một lần là xong"]},
    fafsa:{t:"FAFSA",b:"Hạn ưu tiên FAFSA của Temple là 1/2. Nộp hằng năm tại studentaid.gov, và ghi Temple đầu tiên nếu muốn nhận PA State Grant."},
    offer:{t:"Gói trợ cấp và học bổng",b:"Gói trợ cấp của bạn nằm ở mục Costs & Aid trên TUportal. Trợ cấp và học bổng không cần chấp nhận; khoản vay thì cần."},
    coa:{t:"Chi phí học",b:"Năm 2026–27, sinh viên cư trú tại PA học Liberal Arts có ngân sách khoảng $48,160/năm, trong đó học phí và lệ phí khoảng $21,474."},
    contact:{t:"Liên hệ SFS",b:"Gọi SFS: 215-204-2244, Thứ Hai–Thứ Sáu 8:30–5, hoặc email sfs@temple.edu. Lịch hẹn (trực tiếp hoặc Zoom) đặt qua QLess."},
    offices:{t:"SFS hay Bursar?",b:"SFS lo về trợ cấp: FAFSA, học bổng, khoản vay, xác minh và SAP. Bursar lo hóa đơn, thanh toán, trả góp và hoàn tiền qua TUpay."},
    ferpa:{t:"Phụ huynh và quyền riêng tư (FERPA)",b:"SFS chỉ có thể trao đổi với phụ huynh về tài khoản của bạn nếu họ có tên trong giấy miễn trừ FERPA."},
    pasg:{t:"PA State Grant",b:"FAFSA không tự gửi hết thông tin cho PHEAA. Bạn phải điền mẫu đơn PA State Grant riêng, và Temple phải là trường đầu tiên trong FAFSA."},
    payplan:{t:"Kế hoạch trả góp",b:"Nếu chưa trả đủ trước hạn, số dư tự động chuyển sang Kế hoạch Trả chậm với phí $50. Hạn chót học kỳ xuân là 4/3/2027."},
    dependency:{t:"Tình trạng độc lập",b:"Đủ 18 hay 21 tuổi, sống riêng hoặc cha mẹ không hỗ trợ đều không làm bạn được xem là độc lập. Bạn có thể xin xét lại tình trạng."},
    payback:{t:"Khoản nào phải trả lại",b:"Trợ cấp và học bổng (như Pell, SEOG, trợ cấp của Temple, PA State Grant) không phải trả lại. Khoản vay thì phải trả."}},
  es:{
    late:{t:"Mi ayuda no ha llegado",b:"La mayoría de las subvenciones se aplican desde el 6 de enero. La PA State Grant y Temple Promise solo llegan después del periodo de add/drop, así que una diferencia en tu factura de enero es normal.",s:["Revisa TUportal → Costs & Aid por tareas pendientes","Préstamos: completa el MPN y la asesoría de ingreso en studentaid.gov","¿Sin pagar el 21 de enero? Pasa a un plan de pago ($50). Paga antes del 4 de marzo para evitar una retención"]},
    bill:{t:"Mi factura y fechas",b:"Tu factura de primavera vence el 21 de enero de 2027. Si no puedes pagar todo, el resto pasa automáticamente al Plan de Pago Diferido con un cargo de $50.",s:["Revisa tu saldo en TUpay","Paga el resto antes del 4 de marzo de 2027","No pagar antes del 4 de marzo agrega un cargo de $200 y una retención"]},
    refund:{t:"Recibir mi reembolso",b:"Si tu ayuda es mayor que tu factura, la diferencia se te devuelve, normalmente unos días antes de empezar las clases.",s:["TUportal → TUpay → Manage My Refunds","Elige depósito directo (lo más rápido)","Si no eliges, recibirás un cheque por correo"]},
    hold:{t:"Una retención en mi cuenta",b:"Una retención significa que un saldo anterior no se pagó antes de la fecha final. Bloquea la inscripción, los expedientes y los diplomas.",s:["Revisa el monto en TUpay","La ayuda federal no puede pagar un semestre anterior","Págalo o pregunta por un préstamo privado (formulario a sfs@temple.edu, asunto “Prior Balance”)"]},
    verif:{t:"Documentos de verificación",b:"El gobierno eligió tu FAFSA para revisarla. Tu ayuda no se pagará hasta que termines.",s:["Súbelos solo a temple.studentforms.com, no por correo","Normalmente: transcripciones de impuestos, W-2 o identificación","Termina antes del 1 de junio para conservar las becas de Temple"]},
    sap:{t:"Mantener mi ayuda (SAP)",b:"Para mantener la ayuda necesitas un GPA de al menos 2.0 y aprobar el 67% de los créditos que intentas.",s:["Si fallas una vez: advertencia. Dos veces: pierdes la ayuda","Apela en el SFS dashboard con un plan firmado por tu asesor","Fecha límite de apelación de otoño 2026: 30 de noviembre"]},
    loans:{t:"Préstamos estudiantiles",b:"Los préstamos federales deben aceptarse en TUportal y no se pagan hasta completar dos pasos en línea.",s:["Acéptalos en TUportal → Costs & Aid","Firma el MPN y haz la asesoría de ingreso en studentaid.gov","¿Medio tiempo (6–11 créditos)? Tu préstamo llega después de add/drop"]},
    other:{t:"Hablar con una persona",b:"Llama a SFS al 215-204-2244 (lun–vie, 8:30–5) o escribe a sfs@temple.edu. Las citas se reservan en QLess y se llenan rápido cerca de las fechas de pago.",s:["Ten listo tu nombre y Temple ID (dilo por teléfono, no por correo)","Facturas y reembolsos son del Bursar: 215-204-7269","Prepara tu caso antes para resolverlo en una visita"]},
    fafsa:{t:"FAFSA",b:"La fecha prioritaria de FAFSA de Temple es el 1 de febrero. Preséntala cada año en studentaid.gov y pon a Temple primero si quieres la PA State Grant."},
    offer:{t:"Oferta de ayuda y becas",b:"Tu oferta de ayuda está en la pestaña Costs & Aid de TUportal. Las becas y subvenciones no necesitan aceptarse; los préstamos sí."},
    coa:{t:"Lo que cuesta estudiar",b:"Para 2026–27, un residente de PA en Liberal Arts tiene un presupuesto de unos $48,160 al año, incluidos unos $21,474 de matrícula y cuotas."},
    contact:{t:"Contactar a SFS",b:"Llama a SFS al 215-204-2244, lun–vie 8:30–5, o escribe a sfs@temple.edu. Las citas (en persona o por Zoom) se reservan en QLess."},
    offices:{t:"¿SFS o el Bursar?",b:"SFS se encarga de la ayuda: FAFSA, becas, préstamos, verificación y SAP. El Bursar se encarga de facturas, pagos, planes de pago y reembolsos en TUpay."},
    ferpa:{t:"Padres y privacidad (FERPA)",b:"SFS solo puede hablar con tus padres sobre tu cuenta si están en tu autorización FERPA."},
    pasg:{t:"PA State Grant",b:"La FAFSA no envía todo a PHEAA. Debes completar el formulario aparte de la PA State Grant, y Temple debe ser la primera escuela en tu FAFSA."},
    payplan:{t:"Planes de pago",b:"Si no pagas antes de la fecha límite, tu saldo pasa automáticamente al Plan de Pago Diferido con un cargo de $50. La fecha final de primavera es el 4 de marzo de 2027."},
    dependency:{t:"Estatus independiente",b:"Cumplir 18 o 21, vivir solo o que tus padres no ayuden no te hace independiente para la ayuda. Puedes pedir una revisión."},
    payback:{t:"Lo que debes devolver",b:"Las becas y subvenciones (como Pell, SEOG, becas de Temple y la PA State Grant) no se devuelven. Los préstamos sí."}},
  zh:{
    late:{t:"我的资助还没到",b:"大部分助学金从 1 月 6 日起入账。PA State Grant 和 Temple Promise 要到加退选期之后才会入账，所以一月账单上有差额是正常的。",s:["在 TUportal → Costs & Aid 查看是否有未完成的事项","贷款：在 studentaid.gov 完成 MPN 和入学辅导","1 月 21 日前未付清？余额会转入付款计划（$50）。3 月 4 日前付清以免被冻结"]},
    bill:{t:"账单和截止日期",b:"春季账单于 2027 年 1 月 21 日到期。如果无法全部付清，余额会自动转入延期付款计划，收取 $50 费用。",s:["在 TUpay 查看余额","在 2027 年 3 月 4 日前付清余款","错过 3 月 4 日将收取 $200 费用并冻结账户"]},
    refund:{t:"领取退款",b:"如果你的资助多于账单，多出的部分会退还给你，通常在开学前几天。",s:["TUportal → TUpay → Manage My Refunds","选择直接存款（最快）","不选择的话会通过邮寄收到纸质支票"]},
    hold:{t:"账户被冻结 (hold)",b:"账户被冻结表示之前的欠款没有在最终期限前付清。这会阻止选课、成绩单和毕业证书。",s:["在 TUpay 查看金额","联邦资助不能支付以前学期的欠款","付清欠款，或咨询私人贷款（表格发至 sfs@temple.edu，主题 “Prior Balance”）"]},
    verif:{t:"核实材料",b:"政府抽中了你的 FAFSA 进行核实。核实完成前，你的资助不会发放。",s:["只上传到 temple.studentforms.com，不要用电子邮件","通常需要报税记录、W-2 或身份证明","在 6 月 1 日前完成，以保留 Temple 的助学金"]},
    sap:{t:"保持资助资格 (SAP)",b:"要保持资助，你的 GPA 至少要 2.0，并通过所修学分的 67%。",s:["第一次未达标：警告。第二次：失去资助","在 SFS dashboard 上申诉，并附学业顾问签字的计划","2026 秋季申诉截止日：11 月 30 日"]},
    loans:{t:"学生贷款",b:"联邦贷款必须在 TUportal 上接受，并且要完成两个在线步骤后才会发放。",s:["在 TUportal → Costs & Aid 接受贷款","在 studentaid.gov 签署 MPN 并完成入学辅导","非全日制（6–11 学分）？贷款在加退选期后发放"]},
    other:{t:"找人帮忙",b:"致电 SFS：215-204-2244（周一至周五 8:30–5:00），或发邮件至 sfs@temple.edu。预约通过 QLess，临近缴费日期时很快约满。",s:["准备好姓名和 Temple ID（电话里说，不要发邮件）","账单和退款归 Bursar 管：215-204-7269","提前准备好材料，一次解决"]},
    fafsa:{t:"FAFSA",b:"Temple 的 FAFSA 优先截止日是 2 月 1 日。每年在 studentaid.gov 提交；如果想获得 PA State Grant，请把 Temple 列在第一位。"},
    offer:{t:"资助方案和奖学金",b:"你的资助方案在 TUportal 的 Costs & Aid 标签下。助学金和奖学金无需接受；贷款需要接受。"},
    coa:{t:"上学的费用",b:"2026–27 学年，就读文理学院的宾州居民预算约为每年 $48,160，其中学费和杂费约 $21,474。"},
    contact:{t:"联系 SFS",b:"致电 SFS：215-204-2244，周一至周五 8:30–5:00，或发邮件至 sfs@temple.edu。预约（现场或 Zoom）通过 QLess。"},
    offices:{t:"找 SFS 还是 Bursar？",b:"SFS 负责资助：FAFSA、助学金、贷款、奖学金、核实和 SAP。Bursar 负责账单、付款、分期付款和退款（通过 TUpay）。"},
    ferpa:{t:"父母与隐私 (FERPA)",b:"只有你的父母在你的 FERPA 授权名单上，SFS 才能和他们谈论你的账户。"},
    pasg:{t:"PA State Grant",b:"FAFSA 不会把所有信息发给 PHEAA。你必须另外填写 PA State Grant 表格，而且 FAFSA 上的第一所学校必须是 Temple。"},
    payplan:{t:"分期付款",b:"如果在截止日前没有付清，余额会自动转入延期付款计划，收取 $50 费用。春季最终付款日是 2027 年 3 月 4 日。"},
    dependency:{t:"独立身份",b:"满 18 或 21 岁、独自生活或父母不支持，都不会让你在资助上被视为独立学生。你可以申请身份复审。"},
    payback:{t:"哪些需要还",b:"助学金和奖学金（如 Pell、SEOG、Temple 助学金和 PA State Grant）不需要偿还。贷款需要偿还。"}},
};

// Conversational replies (keyed by the English text the brain returns)
const SAY_TR = {
  "Hi! I can help with aid, bills, refunds, holds and anything else SFS. What’s going on?":{vi:"Chào bạn! Mình có thể giúp về trợ cấp, hóa đơn, hoàn tiền, khóa tài khoản và mọi việc liên quan đến SFS. Bạn đang gặp chuyện gì?",es:"¡Hola! Puedo ayudarte con ayuda financiera, facturas, reembolsos, retenciones y todo lo de SFS. ¿Qué está pasando?",zh:"你好！我可以帮你解答资助、账单、退款、账户冻结等所有 SFS 相关问题。你遇到了什么情况？"},
  "Of course. Tell me what’s going on in your own words, or pick one of these:":{vi:"Tất nhiên rồi. Hãy kể cho mình bằng lời của bạn, hoặc chọn một trong các mục sau:",es:"Claro. Cuéntame qué pasa con tus palabras, o elige una de estas opciones:",zh:"当然可以。用你自己的话告诉我发生了什么，或者选择以下一项："},
  "I want to get this right. Which of these is closest?":{vi:"Mình muốn trả lời đúng. Câu nào gần với ý bạn nhất?",es:"Quiero responderte bien. ¿Cuál de estas se parece más?",zh:"我想准确回答你。以下哪一项最接近？"},
  "Can you tell me a bit more? For example, is this about a missing grant, your bill, a refund or a hold?":{vi:"Bạn nói rõ hơn được không? Ví dụ: tiền trợ cấp chưa đến, hóa đơn, hoàn tiền hay bị khóa tài khoản?",es:"¿Puedes contarme un poco más? Por ejemplo, ¿es sobre una subvención que falta, tu factura, un reembolso o una retención?",zh:"能再多说一点吗？比如，是助学金没到、账单、退款，还是账户被冻结？"},
  "Anytime! If anything else comes up with aid or your bill, just ask.":{vi:"Không có gì! Nếu có thắc mắc gì khác về trợ cấp hay hóa đơn, cứ hỏi nhé.",es:"¡Con gusto! Si surge algo más sobre tu ayuda o tu factura, pregúntame.",zh:"不客气！如果还有关于资助或账单的问题，随时问我。"},
  "Good luck this semester! I’m here 24/7 if you need me.":{vi:"Chúc bạn học kỳ này thuận lợi! Mình luôn ở đây 24/7 nếu bạn cần.",es:"¡Mucha suerte este semestre! Estoy aquí 24/7 si me necesitas.",zh:"祝你这学期顺利！需要的话我 24 小时都在。"},
  "I’m sorry you’re not feeling good. You don’t have to deal with it alone: Temple’s Tuttleman Counseling Services can help at 215-204-7276 (after hours, press 1). If money stress is part of it, I can help you sort that out too, whenever you’re ready.":{vi:"Mình rất tiếc khi bạn đang không khỏe. Bạn không phải tự mình chịu đựng: Trung tâm Tư vấn Tuttleman của Temple có thể giúp, gọi 215-204-7276 (ngoài giờ, bấm phím 1). Nếu chuyện tiền bạc là một phần lý do, mình cũng có thể giúp bạn khi bạn sẵn sàng.",es:"Siento que no te sientas bien. No tienes que pasarlo solo: Tuttleman Counseling Services de Temple puede ayudarte al 215-204-7276 (fuera de horario, marca 1). Si el estrés por dinero es parte de esto, también puedo ayudarte cuando quieras.",zh:"很抱歉你感觉不太好。你不必独自承受：Temple 的 Tuttleman 心理咨询中心可以帮助你，电话 215-204-7276（非工作时间请按 1）。如果钱的压力也是原因之一，等你准备好了，我也可以帮你理清。"},
  "I’m really glad you told me. If you might hurt yourself or you’re in danger, please reach out right now: call or text 988 (Suicide & Crisis Lifeline), or call 911. On campus, Temple Police is 215-204-1234. Tuttleman Counseling Services is 215-204-7276 (after hours, press 1). You don’t have to go through this alone.":{vi:"Cảm ơn bạn đã chia sẻ với mình. Nếu bạn có thể tự làm hại bản thân hoặc đang gặp nguy hiểm, hãy liên hệ ngay: gọi hoặc nhắn tin 988 (Đường dây Khủng hoảng & Ngăn ngừa Tự tử), hoặc gọi 911. Trong trường, Cảnh sát Temple: 215-204-1234. Trung tâm Tư vấn Tuttleman: 215-204-7276 (ngoài giờ, bấm phím 1). Bạn không phải trải qua chuyện này một mình.",es:"Me alegra mucho que me lo hayas dicho. Si podrías hacerte daño o estás en peligro, busca ayuda ahora: llama o envía un mensaje al 988 (Línea de Prevención del Suicidio y Crisis), o llama al 911. En el campus, la Policía de Temple es el 215-204-1234. Tuttleman Counseling Services: 215-204-7276 (fuera de horario, marca 1). No tienes que pasar por esto solo.",zh:"很高兴你愿意告诉我。如果你可能伤害自己或正处于危险中，请立即求助：拨打或发短信至 988（自杀与危机生命线），或拨打 911。校园内可联系 Temple 警察：215-204-1234。Tuttleman 心理咨询中心：215-204-7276（非工作时间请按 1）。你不必独自面对。"},
  "I hear you, money stress is real and you’re not the only one. Let’s figure out exactly where you stand. Want me to check what you owe and what aid is still coming?":{vi:"Mình hiểu, áp lực tiền bạc là có thật và bạn không phải người duy nhất. Hãy cùng xem chính xác tình hình của bạn. Bạn muốn mình kiểm tra số tiền phải trả và khoản trợ cấp sắp đến không?",es:"Te entiendo, el estrés por dinero es real y no eres el único. Veamos exactamente dónde estás. ¿Quieres que revise lo que debes y la ayuda que aún falta?",zh:"我理解，钱的压力是真实的，你不是一个人。我们来看看你的具体情况。要我帮你查一下欠多少钱、还有哪些资助没到吗？"},
  "That’s fair, it’s frustrating when nobody answers. Tell me what’s going on in a sentence and I’ll get you a straight answer, or set you up to solve it with one call.":{vi:"Bạn nói đúng, không ai trả lời thì rất bực. Hãy kể ngắn gọn chuyện gì đang xảy ra, mình sẽ trả lời thẳng, hoặc giúp bạn chuẩn bị để giải quyết chỉ với một cuộc gọi.",es:"Tienes razón, es frustrante cuando nadie responde. Dime qué pasa en una frase y te doy una respuesta clara, o te preparo para resolverlo con una sola llamada.",zh:"说得对，没人回复确实让人很恼火。用一句话告诉我发生了什么，我会直接回答你，或帮你准备好一次电话就解决。"},
  "I’m Ask SFS, a helper for Temple Student Financial Services. I answer in plain words from official SFS and Bursar policy, show you the source, and if you really need a person I’ll tell you which office and what to have ready.":{vi:"Mình là Ask SFS, trợ lý cho Phòng Hỗ trợ Tài chính Sinh viên của Temple. Mình trả lời dễ hiểu dựa trên chính sách chính thức của SFS và Bursar, kèm nguồn, và nếu bạn thật sự cần gặp người, mình sẽ cho biết nên đến văn phòng nào và cần chuẩn bị gì.",es:"Soy Ask SFS, un asistente de Servicios Financieros Estudiantiles de Temple. Respondo con palabras sencillas según las políticas oficiales de SFS y del Bursar, te muestro la fuente y, si de verdad necesitas a una persona, te digo a qué oficina ir y qué tener listo.",zh:"我是 Ask SFS，Temple 学生财务服务处的助手。我根据 SFS 和 Bursar 的官方政策用简单的话回答，并附上来源；如果你确实需要找人，我会告诉你该去哪个办公室、需要准备什么。"},
  "Ha, that’s outside my lane. I only know Temple money stuff: aid, bills, refunds, holds. Anything there I can help with?":{vi:"Haha, cái đó ngoài khả năng của mình rồi. Mình chỉ biết chuyện tiền bạc ở Temple: trợ cấp, hóa đơn, hoàn tiền, khóa tài khoản. Bạn cần giúp gì về mấy việc đó không?",es:"Ja, eso no es lo mío. Solo sé de dinero en Temple: ayuda, facturas, reembolsos, retenciones. ¿Te ayudo con algo de eso?",zh:"哈，这不在我的范围内。我只懂 Temple 的钱的事：资助、账单、退款、冻结。这些方面有什么需要帮忙的吗？"},
};
const CHIP_TR = {
  "My grant hasn’t shown up":{vi:"Tiền trợ cấp của tôi chưa đến",es:"Mi subvención no ha llegado",zh:"我的助学金还没到"},
  "How much do I owe?":{vi:"Tôi phải trả bao nhiêu?",es:"¿Cuánto debo?",zh:"我欠多少钱？"},
  "Why do I have a hold?":{vi:"Tại sao tài khoản của tôi bị khóa (hold)?",es:"¿Por qué tengo una retención (hold)?",zh:"为什么我的账户被冻结 (hold)？"},
  "When do I get my refund?":{vi:"Khi nào tôi nhận được tiền hoàn lại?",es:"¿Cuándo recibo mi reembolso?",zh:"我什么时候能收到退款？"},
  "Who do I ask, SFS or the Bursar?":{vi:"Tôi nên hỏi SFS hay Bursar?",es:"¿Pregunto a SFS o al Bursar?",zh:"我该问 SFS 还是 Bursar？"},
  "Money is stressing me out":{vi:"Chuyện tiền bạc làm tôi căng thẳng",es:"El dinero me está estresando",zh:"钱的事让我压力很大"},
  "When does my aid arrive?":{vi:"Khi nào trợ cấp của tôi đến?",es:"¿Cuándo llega mi ayuda?",zh:"我的资助什么时候到？"},
  "Can I pay over time?":{vi:"Tôi có thể trả góp không?",es:"¿Puedo pagar a plazos?",zh:"我可以分期付款吗？"},
  "What do I need to do?":{vi:"Tôi cần làm gì?",es:"¿Qué tengo que hacer?",zh:"我需要做什么？"},
  "Who do I call about this?":{vi:"Tôi nên gọi ai về việc này?",es:"¿A quién llamo por esto?",zh:"这个问题我该打给谁？"},
  "This needs a person":{vi:"Việc này cần người thật giải quyết",es:"Esto necesita una persona",zh:"这需要找人处理"},
};

// ---- shared helpers (used by the website and the mobile app) ----
// Guess the language a student wrote in, so the bot can answer in it.
function detectLang(q){
  if (/[㐀-鿿]/.test(q)) return "zh";
  if (/[\u0900-\u097f]/.test(q) || /(^|\s)(namaste|mujhe|mera|meri|kab|kyun|kitna|paisa|chahiye|nahi|hai)(\s|$|[?!.,])/i.test(q)) return "hi";
  if (/[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i.test(q) || /(^|\s)(xin chào|chào|cảm ơn|cám ơn|tôi|không|bao nhiêu|tiền|xin chao|cam on|toi|khong|bao nhieu)(\s|$|[?!.,])/i.test(q)) return "vi";
  if (/[¿¡ñ]/.test(q) || /\b(hola|gracias|cu[aá]ndo|por qu[eé]|mi|qu[eé]|debo|factura|reembolso|becas?|pr[eé]stamo|ayuda|necesito|tengo|puedo)\b/i.test(q)) return "es";
  return "en";
}
const APP_UI = {
  en:{prep:"This needs a person. Prep my case", more:"More on", en:""},
  vi:{prep:"Việc này cần người thật. Chuẩn bị hồ sơ", more:"Xem thêm:", en:"(Phần này hiện chỉ có tiếng Anh.)"},
  es:{prep:"Esto necesita una persona. Preparar mi caso", more:"Más sobre:", en:"(Esta parte por ahora solo está en inglés.)"},
  zh:{prep:"这需要找人处理。准备我的问题", more:"了解更多：", en:"（这部分目前只有英文。）"},
};
// Translate one brain answer into a language (falls back to English, flagged).
function localizeAnswer(a, lang, extra){
  if (!lang || lang === "en" || !TOPIC_TR[lang]) return a;
  const chip = c => (CHIP_TR[c] && CHIP_TR[c][lang]) || c;
  const k = a.topic, en = k ? (CARDS[k] ? CARDS[k].brief : extra && extra[k] && extra[k].brief) : null, tr = k && TOPIC_TR[lang][k];
  if (en && tr && a.text.startsWith(en)) return {...a, text:tr.b, steps:tr.s || [], chips:(a.chips || []).map(chip)};
  if (SAY_TR[a.text] && SAY_TR[a.text][lang]) return {...a, text:SAY_TR[a.text][lang], chips:(a.chips || []).map(chip)};
  const named = a.text.replace(/^Hi \w+! /, "Hi! ");
  if (SAY_TR[named] && SAY_TR[named][lang]) return {...a, text:SAY_TR[named][lang], chips:(a.chips || []).map(chip)};
  return {...a, chips:(a.chips || []).map(chip), englishOnly:true};
}

// ---- Hindi (हिन्दी): India is Temple's 2nd-largest source of international students ----
LANGS.hi = "हिन्दी";
UI.hi = {nav:["विषय","ज़रूरी तारीखें","संपर्क","ऐप खोलें"], h1:"Temple की फ़ीस भरने में हम आपकी कैसे मदद करें?", lede:"अपने शब्दों में पूछें। जवाब SFS और Bursar की आधिकारिक नीतियों से आते हैं, स्रोत के साथ।",
  ph:"जैसे: मेरा ग्रांट अभी तक नहीं आया और बिल की तारीख आ गई है", ask:"पूछें", fine:"अपना TUid, SSN या बैंक नंबर कभी न लिखें।", note:"आधिकारिक नीति वाले पेज सिर्फ़ अंग्रेज़ी में हैं।",
  chatH:"आपका जवाब", clear:"साफ़ करें", topicsH:"विषय के अनुसार देखें", topicsP:"छात्रों के सबसे आम सवालों के छोटे जवाब।", datesH:"ज़रूरी तारीखें", datesP:"स्प्रिंग 2027 और अगले साल की सहायता।",
  contactH:"अब भी किसी व्यक्ति से बात करनी है?", contactP:"फ़ोन करने से पहले जानें कि किस ऑफ़िस से पूछना है।",
  c1k:"सहायता, FAFSA, लोन, SAP", c2k:"बिल, किश्तों में भुगतान, रिफ़ंड", c3k:"चक्कर बचाएँ", c3b:"ऐप में अपना केस तैयार करें", c3s:"हम बताएँगे कि किस ऑफ़िस से संपर्क करना है और क्या तैयार रखना है, ताकि एक बार में काम हो जाए।", c3l:"Ask SFS खोलें →",
  sfs:"स्टूडेंट फ़ाइनेंशियल सर्विसेज़ (SFS)", bursar:"बर्सर ऑफ़िस (Bursar)", hours:"सोम–शुक्र, 8:30–5",
  source:"स्रोत", prep:"ऐप में अपना केस तैयार करें", contact:"संपर्क जानकारी", more:"और जानें:", done:"ठीक है", passed:"बीत चुकी", today:"आज", inDays:n => `${n} दिन बाकी`,
  blocked:"यह ID, SSN या अकाउंट नंबर जैसा लगता है, इसलिए भेजा नहीं गया। कृपया इसे हटाकर फिर से पूछें।",
  foot:"यह छात्रों का प्रोजेक्ट है, Temple University की आधिकारिक साइट नहीं। जवाब SFS और Bursar के सार्वजनिक पेजों पर आधारित हैं; पैसों से जुड़े फ़ैसलों की पुष्टि SFS से करें।",
  chips:["मेरा ग्रांट नहीं आया और बिल की तारीख आ गई है","मुझे रिफ़ंड कब मिलेगा?","मेरे अकाउंट पर hold क्यों है?","मुझे SFS से पूछना चाहिए या Bursar से?"],
  dates:{sapappeal:["फ़ॉल SAP अपील की आख़िरी तारीख","Financial Aid Warning पर हैं? अपील के लिए सलाहकार के हस्ताक्षर वाला प्लान चाहिए।"],bill:["स्प्रिंग बिल की तारीख","बाकी रकम $50 फ़ीस के साथ Deferred Payment Plan में चली जाती है।"],fafsa:["2027–28 FAFSA की प्राथमिक तारीख","Temple की प्राथमिक तारीख। देर से भरने पर कम सहायता मिल सकती है।"],final:["स्प्रिंग भुगतान की आख़िरी तारीख","इसके बाद: $200 लेट फ़ीस और फ़ॉल रजिस्ट्रेशन पर hold।"]}};
TOPIC_TR.hi = {
  late:{t:"मेरी सहायता नहीं आई",b:"ज़्यादातर ग्रांट 6 जनवरी से आते हैं। PA State Grant और Temple Promise सिर्फ़ add/drop के बाद आते हैं, इसलिए जनवरी के बिल में कमी दिखना सामान्य है।",s:["TUportal → Costs & Aid में अधूरे काम देखें","लोन: studentaid.gov पर MPN और entrance counseling पूरा करें","21 जनवरी तक नहीं भरा? बाकी रकम पेमेंट प्लान में जाएगी ($50)। hold से बचने के लिए 4 मार्च तक भरें"]},
  bill:{t:"मेरा बिल और तारीखें",b:"आपका स्प्रिंग बिल 21 जनवरी 2027 को देय है। पूरा न भर पाएँ तो बाकी रकम अपने-आप $50 फ़ीस के साथ Deferred Payment Plan में चली जाती है।",s:["TUpay में अपना बैलेंस देखें","बाकी रकम 4 मार्च 2027 तक भरें","4 मार्च चूकने पर $200 फ़ीस और hold लगता है"]},
  refund:{t:"रिफ़ंड पाना",b:"अगर आपकी सहायता बिल से ज़्यादा है, तो बची रकम आपको वापस मिलती है, आमतौर पर कक्षाएँ शुरू होने से कुछ दिन पहले।",s:["TUportal → TUpay → Manage My Refunds","डायरेक्ट डिपॉज़िट चुनें (सबसे तेज़)","कुछ न चुनने पर डाक से चेक आएगा"]},
  hold:{t:"मेरे अकाउंट पर hold",b:"Hold का मतलब है कि पिछला बकाया आख़िरी तारीख तक नहीं भरा गया। इससे रजिस्ट्रेशन, ट्रांसक्रिप्ट और डिग्री रुक जाती है।",s:["TUpay में रकम देखें","फ़ेडरल सहायता पिछले सेमेस्टर का बकाया नहीं भर सकती","बकाया भरें, या प्राइवेट लोन के बारे में पूछें (फ़ॉर्म sfs@temple.edu पर, विषय “Prior Balance”)"]},
  verif:{t:"वेरिफ़िकेशन के दस्तावेज़",b:"सरकार ने आपका FAFSA दोबारा जाँचने के लिए चुना है। यह पूरा होने तक आपकी सहायता नहीं आएगी।",s:["सिर्फ़ temple.studentforms.com पर अपलोड करें, ईमेल से नहीं","आमतौर पर टैक्स ट्रांसक्रिप्ट, W-2 या पहचान पत्र","Temple ग्रांट बनाए रखने के लिए 1 जून तक पूरा करें"]},
  sap:{t:"सहायता बनाए रखना (SAP)",b:"सहायता बनाए रखने के लिए GPA कम से कम 2.0 होना चाहिए और आपके लिए गए क्रेडिट का 67% पास होना चाहिए।",s:["पहली बार चूके: चेतावनी। दूसरी बार: सहायता बंद","सलाहकार के हस्ताक्षर वाले प्लान के साथ SFS dashboard पर अपील करें","फ़ॉल 2026 अपील की आख़िरी तारीख: 30 नवंबर"]},
  loans:{t:"स्टूडेंट लोन",b:"फ़ेडरल लोन TUportal पर स्वीकार करने होते हैं, और दो ऑनलाइन काम पूरे होने तक पैसे नहीं आते।",s:["TUportal → Costs & Aid में स्वीकार करें","studentaid.gov पर MPN साइन करें और entrance counseling करें","पार्ट-टाइम (6–11 क्रेडिट)? लोन add/drop के बाद आएगा"]},
  other:{t:"किसी व्यक्ति से बात करें",b:"SFS को 215-204-2244 (सोम–शुक्र, 8:30–5) पर कॉल करें या sfs@temple.edu पर ईमेल करें। अपॉइंटमेंट QLess पर होते हैं और बिल की तारीखों के पास जल्दी भर जाते हैं।",s:["अपना नाम और Temple ID तैयार रखें (फ़ोन पर बताएँ, ईमेल न करें)","बिल और रिफ़ंड Bursar देखता है: 215-204-7269","पहले से केस तैयार करें ताकि एक बार में काम हो जाए"]},
  fafsa:{t:"FAFSA",b:"Temple की FAFSA प्राथमिक तारीख 1 फ़रवरी है। हर साल studentaid.gov पर भरें, और PA State Grant चाहिए तो Temple को सबसे ऊपर रखें।"},
  offer:{t:"सहायता ऑफ़र और स्कॉलरशिप",b:"आपका सहायता ऑफ़र TUportal के Costs & Aid टैब में है। ग्रांट और स्कॉलरशिप स्वीकार करने की ज़रूरत नहीं; लोन स्वीकार करने होते हैं।"},
  coa:{t:"पढ़ाई का ख़र्च",b:"2026–27 में Liberal Arts के PA निवासी छात्र का बजट लगभग $48,160 सालाना है, जिसमें लगभग $21,474 ट्यूशन और फ़ीस है।"},
  contact:{t:"SFS से संपर्क",b:"SFS को 215-204-2244 पर कॉल करें, सोम–शुक्र 8:30–5, या sfs@temple.edu पर ईमेल करें। अपॉइंटमेंट (ऑफ़िस में या Zoom पर) QLess से बुक होते हैं।"},
  offices:{t:"SFS या Bursar?",b:"SFS सहायता देखता है: FAFSA, ग्रांट, लोन, स्कॉलरशिप, वेरिफ़िकेशन और SAP। Bursar बिल, भुगतान, किश्तें और रिफ़ंड TUpay से देखता है।"},
  ferpa:{t:"माता-पिता और गोपनीयता (FERPA)",b:"SFS आपके माता-पिता से आपके अकाउंट के बारे में तभी बात कर सकता है जब वे आपकी FERPA waiver में शामिल हों।"},
  pasg:{t:"PA State Grant",b:"FAFSA सारी जानकारी PHEAA को नहीं भेजता। आपको PA State Grant का अलग फ़ॉर्म भरना होगा, और FAFSA में Temple पहला स्कूल होना चाहिए।"},
  payplan:{t:"किश्तों में भुगतान",b:"तारीख तक पूरा न भरने पर बाकी रकम अपने-आप $50 फ़ीस के साथ Deferred Payment Plan में चली जाती है। स्प्रिंग की आख़िरी तारीख 4 मार्च 2027 है।"},
  dependency:{t:"स्वतंत्र स्थिति",b:"18 या 21 साल का होना, अकेले रहना या माता-पिता का मदद न करना आपको सहायता के लिए स्वतंत्र नहीं बनाता। आप dependency review माँग सकते हैं।"},
  payback:{t:"क्या लौटाना होता है",b:"ग्रांट और स्कॉलरशिप (जैसे Pell, SEOG, Temple ग्रांट, PA State Grant) लौटाने नहीं होते। लोन लौटाने होते हैं।"}};
Object.assign(SAY_TR["Hi! I can help with aid, bills, refunds, holds and anything else SFS. What’s going on?"], {hi:"नमस्ते! मैं सहायता, बिल, रिफ़ंड, hold और SFS से जुड़ी हर बात में मदद कर सकता हूँ। बताइए क्या हुआ है?"});
Object.assign(SAY_TR["Of course. Tell me what’s going on in your own words, or pick one of these:"], {hi:"ज़रूर। अपने शब्दों में बताइए क्या हुआ है, या इनमें से कोई चुनें:"});
Object.assign(SAY_TR["I want to get this right. Which of these is closest?"], {hi:"मैं सही जवाब देना चाहता हूँ। इनमें से कौन सा सबसे क़रीब है?"});
Object.assign(SAY_TR["Can you tell me a bit more? For example, is this about a missing grant, your bill, a refund or a hold?"], {hi:"थोड़ा और बताएँगे? जैसे, क्या यह ग्रांट न आने, बिल, रिफ़ंड या hold के बारे में है?"});
Object.assign(SAY_TR["Anytime! If anything else comes up with aid or your bill, just ask."], {hi:"कोई बात नहीं! सहायता या बिल के बारे में कुछ और हो तो बेझिझक पूछें।"});
Object.assign(SAY_TR["Good luck this semester! I’m here 24/7 if you need me."], {hi:"इस सेमेस्टर के लिए शुभकामनाएँ! ज़रूरत हो तो मैं 24/7 यहाँ हूँ।"});
Object.assign(SAY_TR["I’m sorry you’re not feeling good. You don’t have to deal with it alone: Temple’s Tuttleman Counseling Services can help at 215-204-7276 (after hours, press 1). If money stress is part of it, I can help you sort that out too, whenever you’re ready."], {hi:"मुझे दुख है कि आप ठीक महसूस नहीं कर रहे। आपको अकेले इससे नहीं जूझना है: Temple की Tuttleman Counseling Services 215-204-7276 पर मदद कर सकती है (ऑफ़िस समय के बाद 1 दबाएँ)। अगर पैसों का तनाव भी वजह है, तो जब आप तैयार हों, मैं उसमें भी मदद कर सकता हूँ।"});
Object.assign(SAY_TR["I’m really glad you told me. If you might hurt yourself or you’re in danger, please reach out right now: call or text 988 (Suicide & Crisis Lifeline), or call 911. On campus, Temple Police is 215-204-1234. Tuttleman Counseling Services is 215-204-7276 (after hours, press 1). You don’t have to go through this alone."], {hi:"मुझे ख़ुशी है कि आपने मुझे बताया। अगर आप ख़ुद को नुकसान पहुँचा सकते हैं या ख़तरे में हैं, तो अभी मदद लें: 988 (Suicide & Crisis Lifeline) पर कॉल या मैसेज करें, या 911 पर कॉल करें। कैंपस पर Temple Police: 215-204-1234। Tuttleman Counseling Services: 215-204-7276 (ऑफ़िस समय के बाद 1 दबाएँ)। आपको यह अकेले नहीं सहना है।"});
Object.assign(SAY_TR["I hear you, money stress is real and you’re not the only one. Let’s figure out exactly where you stand. Want me to check what you owe and what aid is still coming?"], {hi:"मैं समझता हूँ, पैसों का तनाव सच में होता है और आप अकेले नहीं हैं। चलिए देखते हैं आपकी स्थिति क्या है। क्या मैं देखूँ कि आपको कितना भरना है और कौन सी सहायता अभी आनी है?"});
Object.assign(SAY_TR["That’s fair, it’s frustrating when nobody answers. Tell me what’s going on in a sentence and I’ll get you a straight answer, or set you up to solve it with one call."], {hi:"आप सही हैं, जब कोई जवाब न दे तो बहुत परेशानी होती है। एक वाक्य में बताइए क्या हुआ है, मैं सीधा जवाब दूँगा, या एक ही कॉल में हल करने की तैयारी करवा दूँगा।"});
Object.assign(SAY_TR["I’m Ask SFS, a helper for Temple Student Financial Services. I answer in plain words from official SFS and Bursar policy, show you the source, and if you really need a person I’ll tell you which office and what to have ready."], {hi:"मैं Ask SFS हूँ, Temple Student Financial Services का सहायक। मैं SFS और Bursar की आधिकारिक नीतियों से आसान शब्दों में जवाब देता हूँ, स्रोत दिखाता हूँ, और अगर सच में किसी व्यक्ति की ज़रूरत हो तो बताता हूँ कि किस ऑफ़िस जाना है और क्या तैयार रखना है।"});
Object.assign(SAY_TR["Ha, that’s outside my lane. I only know Temple money stuff: aid, bills, refunds, holds. Anything there I can help with?"], {hi:"हाहा, यह मेरे दायरे से बाहर है। मुझे सिर्फ़ Temple के पैसों की बातें पता हैं: सहायता, बिल, रिफ़ंड, hold। इनमें कुछ मदद चाहिए?"});
const CHIP_HI = {"My grant hasn’t shown up":"मेरा ग्रांट नहीं आया","How much do I owe?":"मुझे कितना भरना है?","Why do I have a hold?":"मेरे अकाउंट पर hold क्यों है?","When do I get my refund?":"मुझे रिफ़ंड कब मिलेगा?","Who do I ask, SFS or the Bursar?":"SFS से पूछूँ या Bursar से?","Money is stressing me out":"पैसों की वजह से तनाव है","When does my aid arrive?":"मेरी सहायता कब आएगी?","Can I pay over time?":"क्या मैं किश्तों में भर सकता हूँ?","What do I need to do?":"मुझे क्या करना है?","Who do I call about this?":"इसके लिए किसे कॉल करूँ?","This needs a person":"इसके लिए किसी व्यक्ति की ज़रूरत है"};
for (const [k, v] of Object.entries(CHIP_HI)) if (CHIP_TR[k]) CHIP_TR[k].hi = v;
APP_UI.hi = {prep:"इसके लिए किसी व्यक्ति की ज़रूरत है। मेरा केस तैयार करें", more:"और जानें:", en:"(यह हिस्सा अभी सिर्फ़ अंग्रेज़ी में है।)"};
