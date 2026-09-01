export type SupplyType = "demand" | "supply" | "cooperation";
export type MessageStatus = "published" | "resolved" | "expired" | "hidden";

export interface PublicMessage {
  id: string;
  category: string;
  supply_type: SupplyType;
  item_name: string;
  content: string;
  status: MessageStatus;
  expires_at: string;
  resolved_at: string | null;
  created_at: string;
}
