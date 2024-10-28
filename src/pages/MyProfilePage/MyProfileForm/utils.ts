import { ICadastroData } from "./CadasterForm";

export function formatCPF(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3}\.\d{3})(\d)/, "$1.$2")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .replace(/(\d{3}\.\d{3}\.\d{3}-\d{2})\d+?$/, "$1");
}

export function formatCNPJ(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2}\.\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{2}\.\d{3}\.\d{3})(\d)/, "$1/$2")
    .replace(/(\d{2}\.\d{3}\.\d{3}\/\d{4})(\d)/, "$1-$2")
    .replace(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\d+?$/, "$1");
}

export function formatDocument(value: string): string {
  if (value.length <= 14) {
    return formatCPF(value);
  } else {
    return formatCNPJ(value);
  }
}

export function formatUserData(user: ICadastroData): Record<string, unknown> {
  const { governmentId, ...rest } = user;

  const formattedGovernmentId = governmentId.replace(/\D/g, '');
  
  if (user.confirmPassword) {
    delete user.confirmPassword;
  }
  
  return {
    ...rest,
    governmentId: formattedGovernmentId,
  };
}
