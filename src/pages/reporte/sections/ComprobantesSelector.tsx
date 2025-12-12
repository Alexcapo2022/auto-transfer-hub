import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Receipt, Building2 } from "lucide-react";
import type { Comprobante } from "../validation/index";

export function ComprobantesSelector({
  value,
  onChange,
}: {
  value: Comprobante;
  onChange: (v: Comprobante) => void;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-foreground">Tipo de comprobante</Label>

      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as Comprobante)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <label className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4 cursor-pointer hover:bg-secondary/50 transition">
          <RadioGroupItem value="boleta" id="boleta" />
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            <div className="leading-tight">
              <p className="font-semibold">Boleta</p>
              <p className="text-xs text-muted-foreground">DNI / CE</p>
            </div>
          </div>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4 cursor-pointer hover:bg-secondary/50 transition">
          <RadioGroupItem value="factura" id="factura" />
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <div className="leading-tight">
              <p className="font-semibold">Factura</p>
              <p className="text-xs text-muted-foreground">RUC + Razón social</p>
            </div>
          </div>
        </label>
      </RadioGroup>
    </div>
  );
}
