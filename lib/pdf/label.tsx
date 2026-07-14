import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { DropOffSubmission } from "@/lib/schema";

const ink = "#2E332B";
const inkSoft = "#5C6653";
const moss = "#A7B89F";
const rule = "#D7DCD1";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, color: ink, fontFamily: "Helvetica" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: moss,
    paddingBottom: 12,
    marginBottom: 16,
  },
  brand: { fontSize: 18, fontFamily: "Helvetica-Bold" },
  tagline: { fontSize: 8, color: inkSoft, marginTop: 2, letterSpacing: 1 },
  refBlock: { alignItems: "flex-end" },
  refLabel: { fontSize: 7, color: inkSoft, letterSpacing: 1 },
  refValue: { fontSize: 12, fontFamily: "Helvetica-Bold", marginTop: 2 },
  qr: { width: 64, height: 64, marginTop: 6 },
  section: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: moss,
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  row: { flexDirection: "row", marginBottom: 3 },
  label: { width: 110, color: inkSoft },
  value: { flex: 1, fontFamily: "Helvetica-Bold" },
  twoCol: { flexDirection: "row", gap: 24 },
  col: { flex: 1 },
  table: { borderWidth: 1, borderColor: rule, marginBottom: 8 },
  tHeadRow: { flexDirection: "row", backgroundColor: "#F4F1E8" },
  tRow: { flexDirection: "row", borderTopWidth: 1, borderTopColor: rule },
  tCellItem: { flex: 3, padding: 4 },
  tCellSm: { flex: 1, padding: 4, textAlign: "right" },
  tHeadText: { fontSize: 8, fontFamily: "Helvetica-Bold", color: inkSoft },
  boxTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  totalRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 4 },
  totalLabel: { fontSize: 9, color: inkSoft, marginRight: 8 },
  totalValue: { fontSize: 11, fontFamily: "Helvetica-Bold" },
  sigBox: { marginTop: 8, alignItems: "flex-start" },
  sigImg: { width: 160, height: 60, objectFit: "contain" },
  sigLine: { borderTopWidth: 1, borderTopColor: ink, width: 200, marginTop: 2, paddingTop: 2 },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: rule,
    paddingTop: 8,
    fontSize: 8,
    color: inkSoft,
    textAlign: "center",
  },
});

export function Label({
  submission,
  qrDataUrl,
}: {
  submission: DropOffSubmission;
  qrDataUrl: string;
}) {
  const { consignee, boxes, sender, terms, referenceNumber, submittedAt } = submission;
  const grandTotal = boxes.reduce(
    (sum, box) => sum + box.items.reduce((s, i) => s + i.qty * i.price, 0),
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.brand}>POLI PINO PINAS</Text>
            <Text style={styles.tagline}>FILIPINO CULTURAL STORE — BALIKBAYAN BOX SHIPPING LABEL</Text>
          </View>
          <View style={styles.refBlock}>
            <Text style={styles.refLabel}>REFERENCE NO.</Text>
            <Text style={styles.refValue}>{referenceNumber}</Text>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={qrDataUrl} style={styles.qr} />
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={[styles.section, styles.col]}>
            <Text style={styles.sectionTitle}>Consignee / Recipient</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{consignee.firstName} {consignee.lastName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{consignee.primaryPhone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>
                {consignee.streetAddress}, {consignee.barangayName}, {consignee.cityName},{" "}
                {consignee.provinceName}, {consignee.zipCode}
              </Text>
            </View>
          </View>

          <View style={[styles.section, styles.col]}>
            <Text style={styles.sectionTitle}>Sender</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{sender.senderFirstName} {sender.senderLastName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{sender.senderPhone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>ID</Text>
              <Text style={styles.value}>{sender.idType} — {sender.idNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manifest</Text>
          {boxes.map((box, i) => {
            const boxTotal = box.items.reduce((s, it) => s + it.qty * it.price, 0);
            return (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={styles.boxTitle}>Box #{i + 1}</Text>
                <View style={styles.table}>
                  <View style={styles.tHeadRow}>
                    <Text style={[styles.tCellItem, styles.tHeadText]}>Item</Text>
                    <Text style={[styles.tCellSm, styles.tHeadText]}>Qty</Text>
                    <Text style={[styles.tCellSm, styles.tHeadText]}>Price</Text>
                    <Text style={[styles.tCellSm, styles.tHeadText]}>Condition</Text>
                  </View>
                  {box.items.map((item, j) => (
                    <View key={j} style={styles.tRow}>
                      <Text style={styles.tCellItem}>{item.name}</Text>
                      <Text style={styles.tCellSm}>{item.qty}</Text>
                      <Text style={styles.tCellSm}>{item.price.toFixed(2)}</Text>
                      <Text style={styles.tCellSm}>{item.condition}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Box #{i + 1} declared value</Text>
                  <Text style={styles.totalValue}>PHP {boxTotal.toFixed(2)}</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total declared value</Text>
            <Text style={styles.totalValue}>PHP {grandTotal.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sender Signature</Text>
          <View style={styles.sigBox}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={terms.signatureDataUrl} style={styles.sigImg} />
            <Text style={styles.sigLine}>Signed and dated {new Date(submittedAt).toLocaleString()}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Poli Pino Pinas — Filipino Cultural Store. This label was generated online at
          time of drop-off submission. Keep a copy for your records.
        </Text>
      </Page>
    </Document>
  );
}
